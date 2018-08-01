#!/bin/sh
SCRIPT=$(readlink -f "$0")
BASEDIR=$(dirname $SCRIPT)
cd "$BASEDIR"

echo "Limpiando el entorno CoCADa"
docker-compose rm -s --force   > /dev/null 2>&1

echo "Limpiando logs (first-run.sh)"
rm "$BASEDIR/log/*.log"   > /dev/null 2>&1

echo "Listo"