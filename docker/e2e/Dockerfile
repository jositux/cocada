
#Todo: alpine?
FROM cypress/base:10 
# Install cypress
ENV CYPRESS_CACHE_FOLDER /.cache/Cypress
RUN npm install --save-dev cypress
RUN $(npm bin)/cypress verify
#RUN $(npm bin)/cypress run