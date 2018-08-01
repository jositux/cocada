#!/bin/sh
echo "Esperando que la Base de Datos este lista para aceptar conecciones."

ready=1
while [ $ready -ne 0 ]
do
    echo -n '.'
    sleep 3
    echo 'SELECT version();'| mysql -umysql -pmysql cocada > /dev/null 2>&1
    ready=$?
done
echo " listo."