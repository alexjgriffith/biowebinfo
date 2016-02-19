FROM alexjgriffith/zeromq:latest
# updated in zeromq:latest
#RUN apt-get update
RUN apt-get install -y nodejs npm
RUN apt-get install -y pkg-config
COPY /src/package.json /src/package.json
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN cd /src; npm install --save

COPY . /src

EXPOSE 8080

#CMD ["nodejs","/src/index.js"]
CMD ["/bin/bash"]
