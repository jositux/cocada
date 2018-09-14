#!/bin/sh
echo "Esperando que la Base de Datos este lista para aceptar conecciones."

ready=1
while [ $ready -ne 0 ]
do
    echo -n '.'
    sleep 3
    # mongo admin --quiet --eval "printjson(db.auth('admin','mongodb'))" --quiet
    # mongo admin --quiet --eval "printjson(db.version())"
    mongo admin --quiet --eval "printjson(db.version())" > /dev/null 2>&1
    ready=$?
done
echo " listo."

