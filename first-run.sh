#!/bin/bash
echo "Preparando el entorno CoCADa"

SCRIPT=$(readlink -f "$0")
BASEDIR=$(dirname $SCRIPT)
source $BASEDIR/other/_common_func

cd "$BASEDIR"

command_exist 'docker' || exit 1;
command_exist 'curl' || exit 1;
command_exist 'docker-compose' || exit 1;

echo "Construyendo imagen node+git"
cd docker && ./build.sh && cd ..

echo "Descargando imágenes de docker hub."
docker-compose pull

echo "Docker: Configurando la Base de Datos (mongodb)"
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

docker-compose rm -s --force  > /dev/null 2>&1
echo "****************************************************************"
echo "Finalizadas las configuraciones iniciales."
echo "A partir de ahora puede lanzar CoCADa directamente desde run.sh"
echo "****************************************************************"
sleep 10

$BASEDIR/run.sh
