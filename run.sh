#!/bin/sh
SCRIPT=$(readlink -f "$0")
BASEDIR=$(dirname $SCRIPT)
cd "$BASEDIR"

echo "Iniciando CoCADa."
echo "Docker: Levantando los Servicios."
docker-compose up -d > /dev/null 2>&1

echo -n "Esperando la restAPI este disponible... ["
while true; do
    curl "http://localhost:3010/explorer" -q > /dev/null 2>&1
    EC=$?
    if [ $EC -eq 0 ]; then
        break
    fi
    echo -n '.';
    sleep 5
done
echo "] ok"

echo -n "Esperando que CoCADA este disponible... ["
while true; do
    curl "http://localhost:3000/" -q > /dev/null 2>&1
    EC=$?
    if [ $EC -eq 0 ]; then
        break
    fi
    echo -n '.';
    sleep 5
done
echo "] ok"

echo "Ejecutando navegador http://localhost:3000/"
sleep 5

xdg-open "http://localhost:3000"
