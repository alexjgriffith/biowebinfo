var socket = io.connect('/');
var id=null;

socket.on('onconnected',function(data){
    id=data.id;
    console.log('My ID is :' + data.id);
    testEmit("twentyOne");
});

socket.on("message",function(message){
    console.log(message.message);
});

function sendMessage(value){
    socket.emit("message",{user: id,message: value});
}
