FROM alexjgriffith/zmq-test
# updated in zeromq:latest
RUN apt-get update
RUN apt-get install -y nodejs npm
RUN apt-get install -y pkg-config
COPY src/package.json /src/package.json
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN npm install -g nodemon
RUN cd /src; npm install 

WORKDIR /src
#COPY /src /src
#ADD src /src
EXPOSE 8000

CMD ["node","/src/index.js"]
#CMD ["/bin/bash"]
