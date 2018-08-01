#!/bin/sh
echo "Preparando el entorno CoCADa"

SCRIPT=$(readlink -f "$0")
BASEDIR=$(dirname $SCRIPT)
cd "$BASEDIR"

echo "Probando requisitos"
if ! [ -x "$(command -v docker)" ]; then
    echo "ERROR: Se requiere docker." >&2
    exit 1
else
    echo "Docker esta instalado...ok"
fi

if ! [ -x "$(command -v docker-compose)" ]; then
    echo "ERROR: Se requiere docker-compose." >&2
    exit 1
else
    echo "Docker-compose esta instalado...ok"
fi

if ! [ -x "$(command -v curl)" ]; then
    echo "ERROR: Se requiere curl." >&2
    exit 1
else
    echo "Curl esta instalado...ok"
fi

echo "Descargando imágenes de docker hub."
docker-compose pull

echo "Docker: Configurando la Base de Datos (mysql)"
docker-compose up -d db  > /dev/null 2>&1
# Si la base de datos no inicio aún, espero.
docker-compose exec db /wait-db.sh

echo "Docker: Instalado librerías de la restAPI (loopback), espere..." 
docker-compose run restapi npm install -q  > ./log/restapi_npm_install.log 2>&1
if [ $? -eq 0 ]; then
    echo "El log se guardo en ./log/restapi_npm_install.log"
    echo "ok"
else
    echo "ERROR: El log se guardo en ./log/restapi_npm_install.log"
    exit 1
fi

echo "Docker: Instalando librerías frontend CoCADa (nuxt.js), espere..."
docker-compose run cocada npm install -q  > ./log/cocada_npm_install.log 2>&1
if [ $? -eq 0 ]; then
    echo "El log se guardo en ./log/cocada_npm_install.log"
    echo "ok"
else
    echo "ERROR: El log se guardo en ./log/cocada_npm_install.log"
    exit 1
fi

echo "****************************************************************"
echo "Finalizadas las configuraciones iniciales."
docker-compose rm -s --force  > /dev/null 2>&1
echo "A partir de ahora puede lanzar CoCADa directamente desde run.sh"
echo "****************************************************************"

$BASEDIR/run.sh