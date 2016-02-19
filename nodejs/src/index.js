
var zmq= require('zmq');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var SHA256 = require("crypto-js/sha256");
var UUID = require("node-uuid");
var fs = require("fs");

var data = JSON.parse(fs.readFileSync('/src/database.txt','utf8'));

var clients={};

var PORT =8000;
var express = require('express');
var app= express();
var server = require('http').createServer(app);
var io = require("socket.io").listen(server);

function brodcast(value,uuid,message){
    var i;
    var keys=Object.keys(clients);
    for(i=0;i<keys.length;i++){
	if(uuid != keys[i])
	    clients[keys[i]].emit(value,message);	
    }
}

io.sockets.on('connection',function(client){    
    client.userid=UUID();
    clients[client.userid]=client;
    client.emit('onconnected',{id: client.userid});
    client.on('disconnect', function(){
	console.log("User Disconected: "+client.userid);
	delete clients[client.userid];
    });
    client.on('brodcast',function(message){
	console.log("message recived");
	brodcast("bordcast",client.userid,{message:message.message});    
    });

    client.on('mousepos',function(message){
	brodcast("mousepos",client.userid,{id:client.userid,message:message.message});    
    });
    client.on("mout",function(message){
	      brodcast("mout",client.userid,{id:client.userid});}
	     );
    client.on('brodcastMouse',function(message){
	console.log("message recived");
	brodcast("mouseIN",client.userid,{message:message.message});    
    });

    client.on('message',function(message){
	console.log("message recived");
	client.emit("message",{message:message.message});    
    });

    });


server.listen(PORT);
console.log('Running on http://localhost:'+PORT);

app.get('/',function(req,res){
    res.sendFile( __dirname + "/" + "index.html");
});


app.use("/javascript",express.static(__dirname+"/javascript"));
app.use("/",express.static(__dirname+"/static"));

app.post('/process_post',urlencodedParser,function(req,res){
    var killcount=Math.floor(Math.random() * 20);
    var response={first_name:req.body.fn,
		  last_name:req.body.ln,
		  killcount:killcount,
		  password:SHA256("mysite"+killcount+req.body.ps),
		  email:req.body.email,
		  user_name:req.body.un};
    console.log(response);

    data[req.body.un]=response;
    fs.writeFileSync("/src/database.txt",JSON.stringify(data));
    res.end(JSON.stringify(data));
});
