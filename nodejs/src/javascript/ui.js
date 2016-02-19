var canvas,context;

var mouse={x: 0, y: 0},mouseFlag=false;

var pmouse={ids:[]};

var keyboard=false;

var camera={x:0,y:0,xh:400,yh:400};

var click={flag: false,tflag:false,step: 0,min:5, by: 1, max: 10,speed: 2,n:0,x: 0 ,y: 0,left: true};

var ui_emiter = new EventEmitter();


function init_ui(canvas){
    canvas.addEventListener('mousemove',Mtracker, false);
    canvas.addEventListener('mouseup',
			    function(e){
				if(click.left) 
				    clickAct(e,true);
				else
				    //clickAct(e,true);
				    click.left=true;
			    }
			    , false);
    canvas.addEventListener('contextmenu',
			    function(e){clickAct(e,false);}, false);
    canvas.addEventListener('mouseout',function(){ui_emiter.emitEvent("mout");;mouseFlag=false;}, false);
    canvas.addEventListener('mouseover',function(){mouseFlag=true;}, false);
    canvas.style.cursor = "none";
    canvas.oncontextmenu = function (e) {e.preventDefault();};
}

function genBlock(currY,currX,mapDetails){
    return {y: Math.floor((currY-mapDetails.offY)/mapDetails.yh), 
	    x: Math.floor((currX-mapDetails.offX)/mapDetails.xh)};
}

function fillBlockWrap(value,i,j,mapDetails){
    var block ={x: i ,y: j};
    if(value!=0){
	//console.log(""+value+" "+block.x+" "+block.y);
	fillBlock(block,value,mapDetails);
    }
}

function fillBlockWrapI(value,i,j,mapDetails){
    var block ={x: i ,y: j};
    if(value!=0){
	//console.log(""+value+" "+block.x+" "+block.y);
	drawBlock(block,value,mapDetails);
    }
}

function strokeBlock(block,colour,mapDetails){
    context.strokeStyle=colour;
    var t=mapDetails;
    context.strokeRect(t.xh*(block.x)+t.offX,
		       t.yh*(block.y)+t.offY,t.xh,t.yh);
}

function fillBlock(block,colour,mapDetails){
    context.fillStyle=colour;
    var t=mapDetails;
    context.fillRect(t.xh*(block.x)+t.offX,
		     t.yh*(block.y)+t.offY,
		     t.xh,t.yh);

}

function drawBlock(block,tile,mapDetails){
    var t=mapDetails;
    context.drawImage(tile.image,0,0,20,20,t.xh*(block.x)+t.offX,
		      t.yh*(block.y)+t.offY,20,20);

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


function Mtracker (e){
    //var canvas=cameraCanvas;
    mouse = getMousePos(canvas, e);
    ui_emiter.emitEvent("mtrack");
}

function clickFlagSet(e,left){
    var mouse = getMousePos(canvas, e);
    click.left=left;
    click.flag=true;
    click.tflag=true;
    click.x=mouse.x;
    click.y=mouse.y;
    click.step=click.min;        

}

function clickFlagSetSignal(e,left){
    var mouse = {x:e.clientX,y:e.clientY};
    click.left=left;
    click.flag=true;
    click.tflag=true;
    click.x=mouse.x;
    click.y=mouse.y;
    click.step=click.min;        

}

function clickAct (e,left){     
    clickFlagSet(e,left);
    ui_emiter.emitEvent("click");
}

function hover(){
    //var context=cameraContext;
    if(mouseFlag){
	var block=genBlock(mouse.y+camera.yt(),
			   mouse.x+camera.xt(),map.mapDetails);
	//strokeBlock(block,"black",map.mapDetails);
	context.fillStyle="black";
	var t=map.mapDetails;
	context.strokeRect(t.xh*(block.x)+t.offX-camera.xt(),
			   t.yh*(block.y)+t.offY-camera.yt(),t.xh,t.yh);

    }
    
}


function drawMouse(mouse,colour){
    //var context=cameraContext;
    if(mouseFlag){
	context.strokeStyle=colour;
	context.beginPath();
	context.arc(mouse.x,mouse.y,5,0,2*Math.PI);
	context.stroke();
	context.beginPath();
	context.arc(mouse.x,mouse.y,1,0,2*Math.PI);
	context.stroke();
    }
}

function drawMouseF(mouse,colour){
    //var context=cameraContext;

	context.strokeStyle=colour;
	context.beginPath();
	context.arc(mouse.x,mouse.y,5,0,2*Math.PI);
	context.stroke();
	context.beginPath();
	context.arc(mouse.x,mouse.y,1,0,2*Math.PI);
	context.stroke();

}
