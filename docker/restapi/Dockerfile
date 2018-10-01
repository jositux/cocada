FROM node:8.9.4-alpine
# Install Python (restApi - loopback)
RUN apk add --no-cache g++ gcc libgcc libstdc++ linux-headers make python
# install globaly loopback-cli
RUN npm -g config set user root
RUN npm install -g loopback-cli
# Devel tool (autorestart node on file change)
RUN npm install -g nodemon
CMD [ "node" ]
