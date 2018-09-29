FROM node:8.9.4-alpine
# Install GIT (Cocada - openjscad)
RUN apk add --no-cache git 
# Install Python (restApi - loopback)
RUN apk add --no-cache g++ gcc libgcc libstdc++ linux-headers make python
# Devel tool
RUN npm install -g nodemon
CMD [ "node" ]
