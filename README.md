# CoCADa
Collaborative Computer Aided Design Application

Código fuente del prototipo de la tesis de grado "Desarrollo de una aplicación web colaborativa para revisiones de modelos sólidos paramétricos mediante el enfoque Lean UX"

### Primera Vez
Este script realiza la instalación de las librerías necesarias y genera los contenedores docker.

./first-run.sh

### Ejecutar CoCADa
./run.sh


Nota: Es necesario generar un falso DNS "cocada" a la ip 127.0.0.1 (localhost) (linux en /etc/hosts)
Los scripts se probaron en linux, posiblemente requieran ajustes en otros SO.

Automáticamente se crean los dos usuarios de ejemplo:
persona-a
persona-b
Las contraseñas son las mismas que los nombre de usuario. 
