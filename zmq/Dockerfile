FROM ubuntu:latest
RUN apt-get install -y curl
RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y pkg-config
RUN curl http://download.zeromq.org/zeromq-4.1.4.tar.gz > ~/zeromq-4.1.4.tar.gz
RUN curl https://download.libsodium.org/libsodium/releases/libsodium-1.0.8.tar.gz > ~/libsodium-1.0.8.tar.gz
RUN tar -zxf ~/zeromq-4.1.4.tar.gz -C /tmp
RUN tar -zxf ~/libsodium-1.0.8.tar.gz -C /tmp
RUN cd /tmp/libsodium-1.0.8  && ./configure && make && make install
RUN cd /tmp/zeromq-4.1.4 && ./configure && make && make install
RUN ldconfig
CMD ["/bin/bash"]
