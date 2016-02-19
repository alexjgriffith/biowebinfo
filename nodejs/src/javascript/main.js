var canvas,context;

var ptime,time;

var pushEvents=[];
var pushActions=[];

var fps =30;

function updateTime(){ptime=time;time=Date.now();}
function dtime(){return time-ptime;}

function main(){
    document.getElementById("canvasDiv").innerHTML=
	'<canvas id="canvasId" width="'+
	camera.xh+'" height="'+camera.yh+'"></canvas>'+
	'<ul id="unl"></ul>';
    canvas=document.getElementById("canvasId");
    context=canvas.getContext("2d");
    init_ui(canvas);
    time=Date.now();
    window.requestAnimationFrame(loop);
}

function sendMessages(){
    pushEvents.forEach(function(x) {x();});
    pushEvents=[];
    pushActoins=[];
}

function render(){
    canvas.width=canvas.width;
    if(click.flag)
	drawClick();
    drawMouse(mouse,"black");
    pmouse.ids.forEach(function(x){drawMouseF(pmouse[x],"red");});
}

function pause(){
    var upstep=1000/fps-dtime;
    if(upstep>0){
	setTimeout(function(){
	    window.requestAnimationFrame(loop);},
		   1000/fps-dtime);
    }
    else
	window.requestAnimationFrame(loop);
}

function loop(){
    render();
    sendMessages();
    updateTime();
    pause();
}

