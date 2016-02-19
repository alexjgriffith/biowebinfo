var socket = io.connect('/');
var id=null;

var updatePostElmF;
function updatePostElm(){
    var mousePositions=[];
    var mpl=6;
    var postElm=document.getElementById("unl");
    return function(newPos){
	var i;
	var col="";
	if(! (mousePositions.length<mpl))
	    mousePositions.shift(1);
	mousePositions.push(JSON.stringify(newPos));
	for(i=0;i<mousePositions.length;i++)
	    col=col+"<li>"+mousePositions[i]+"</li>";
	console.log(col);
	postElm.innerHTML=col;};
}

function mousePrinter(mouse){
    var message =  'Mouse position: ' +mouse.x + ', '+ mouse.y;	
    return message;
}

function send (chan,value){
    if (! (chan in pushActions)){
	pushEvents.push(function(){
	    socket.emit(chan,{user: id,message: value});
	});
	pushActions.push(chan);
    }
}

function sendMessage(value){
    socket.emit("message",{user: id,message: value});
}


ui_emiter.addListener("mtrack",function(){
    var message = {x: mouse.x, y: mouse.y};    
    send("mousepos",message);});

ui_emiter.addListener("click",function(){
    var message = {clientX: mouse.x, clientY: mouse.y};    
    send("brodcastMouse",message);});

ui_emiter.addListener("mout",function(message){
    send("mout",message);});

socket.on('mout',
	  function(message){
	      console.log("mouseout");
	      pmouse.ids=[];
	  });

socket.on('onconnected',function(data){
    id=data.id;
    console.log('My ID is :' + data.id);
    sendMessage("twentyOne");
});

socket.on("message",function(message){
    console.log(message.message);
});

socket.on("mousepos",function(message){ 
    if(! (message.id in pmouse.ids))
	pmouse.ids.push(message.id);
    pmouse[message.id]=message.message;
});

socket.on("mouseIN",function(message){
    updatePostElmF= updatePostElmF || new updatePostElm();
    updatePostElmF(message);
    clickFlagSetSignal(message.message,true);
});

