if [ $(docker ps | grep test-node | wc -l ) -eq 1 ]
then
docker stop test-node
docker rm test-node
fi
docker build -t griffita/ubuntu-node-hello .
#docker run -d -p 8080:8080 -P -v $HOME/Development/node:/src/assets --name test-node griffita/ubuntu-node-hello
docker run --rm  -ti -p 8080:8080 -P -v $HOME/Development/node:/src/assets --name test-node griffita/ubuntu-node-hello

