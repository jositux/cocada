#!/bin/bash
SCRIPT=$(readlink -f "$0")
BASEDIR=$(dirname $SCRIPT)
source $BASEDIR/other/_common_func

cd "$BASEDIR"

echo "Iniciando CoCADa."
echo "Docker: Levantando los Servicios."
docker-compose up -d > /dev/null 2>&1

echo -n "Esperando la restAPI este disponible... "
wait_http "http://localhost:3010/explorer"

echo -n "Esperando que CoCADA este disponible... "
wait_http "http://localhost:3000/"

echo "Abriendo navegador http://localhost:3000/"
sleep 5

xdg-open "http://localhost:3000"