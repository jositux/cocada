#!/bin/sh
SCRIPT=$(readlink -f "$0")
BASEDIR=$(dirname $SCRIPT)
cd "$BASEDIR"

echo "Deteniendo el entorno CoCADa"
docker-compose down   > /dev/null 2>&1
