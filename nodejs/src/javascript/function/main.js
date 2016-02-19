//var engine=  __engine;
//var makeSystem= engine.__gameObj.makeSystem;

/*__gameObj.systems["addRender"]=function(ents,render){
    ents["render"]={};
    ents.render["render"]= render;    
    return ents;
};
__gameObj.systems["setxy"]=function(ents,x,y){
    ents.pos.x=x;
    ents.pos.y=y;
    return ents;
};

__gameObj.systems["drawClick"]=function(ents){    
    var anim=new __ui.drawClickAux(ents.animationStage,ents.pos.x,ents.pos.y);
    if(ents.mouseClick.trig){
	ents.animationStage={step:5,min:5,by:1,max:10,speed:10,n:0};
	ents.mouseClick.trig=false;
    }
    if(ents.animationStage.step<ents.animationStage.max*ents.animationStage.speed){
	
	ents.animationStage.step=ents.animationStage.step+1;
    }
    else {
	__gameObj.removeEnt(__gameObj,ents.id.id);
	anim=false;	
	 };
    return {ents:ents,anim:anim};
};
*/



function a(name,height,vars){
    var v=vars;
    this.name=name+v;
    this.height=height+v;
    this.testf=function(){v= this.name+this.height ;return v;};
    this.printv=function(){return v;};
}

function makeClick(game,x,y){
    return function(){
	var id= game.makeEnt(game,{pos:{}, animationStage:{}, mouseClick:{}, id:{}});   
	game.ents[id]=game.systems["addRender"](game.ents[id],"drawClick");
	game.C2E["render"].push(id);
	game.E2C[id].push("render");
	game.ents[id].id.id=id;
	game.ents[id].mouseClick={flag:true,trig:true};   
	game.ents[id]=game.systems["setxy"](game.ents[id],	
					    x,
					    y);    
	return id;};
}



function reshapeCanvas(xh,yh){
    document.getElementById("canvasDiv").innerHTML='<canvas id="canvasId" width="'+xh+'" height="'+yh+'"></canvas>'+'<ul id="unl"></ul>';
}

function updateComments(value){
    document.getElementById("comments").innerHTML=value;
}

function main(){    
    var context,canvas;
    var camera={x:0,y:0,xh:400,yh:400};
    var fps=30;
    reshapeCanvas(camera.xh,camera.yh);
    canvas=document.getElementById("canvasId");
    context=canvas.getContext("2d");
    var game=__engine.call(context,canvas,camera);
    game.makeComponent("pos",{x:0,y:0});
    game.makeComponent("id",{id:null});
    game.makeComponent("render",{render:null});
    game.makeComponent("animationStage",{step:0,min:5,by:1,max:10,speed:2,n:0});
    game.makeComponent("mouseClick",{flag:false,trig:false});

    game.makeSystem("setxy",function(ents,x,y){
	ents.pos.x=x;
	ents.pos.y=y;
	return ents;
    });

    game.makeSystem("addRender",function(ents,render){
	ents["render"]={};
	ents.render["render"]= render;    
	return ents;
    });
	   
    game.makeSystem("drawClick",function(ents){    
	var anim=new this.__ui.drawClickAux(ents.animationStage,ents.pos.x,ents.pos.y);
	if(ents.mouseClick.trig){
	    ents.animationStage={step:5,min:5,by:1,max:10,speed:10,n:0};
	    ents.mouseClick.trig=false;
	}
	if(ents.animationStage.step<ents.animationStage.max*ents.animationStage.speed){
	    
	    ents.animationStage.step=ents.animationStage.step+1;
	}
	else {
	    __engine.__gameObj.removeEnt(__engine.__gameObj,ents.id.id);
	    anim=false;	
	};
	return {ents:ents,anim:anim};
    });
    console.log(Object.keys(game["systems"]));
    animationLoop(fps,canvas,context,camera,game)();
};


function pause(fps,canvas,context,camera,game,time){
    var upstep=1000/fps-(time-Date.now() );
    if(upstep>0){
	setTimeout(function(){	    
	    window.requestAnimationFrame(animationLoop(fps,canvas,context,camera,game));},
		   1000/fps-time);
    }
    else
	window.requestAnimationFrame();

}

function render(renderList,canvas,context,camera){
    canvas.width=canvas.width;    
    renderList.forEach(function(x) {if(x)x(canvas,context,camera);});
}

function renderfun (fun,args){
    return function (canvas,context,camera){
	context[fun].apply(context,args);
    };
}


// #gameloop
function animationLoop(fps,canvas,context,camera,game){
    return function (){
	var time=Date.now();	
	var renderList=[];
	var at;
	var id;	
	for(var i=0;i<game.C2E["render"].length;i++){
	    id=game.C2E["render"][i];
	    at=game.systems[game.ents[id].render.render](game.ents[id]);
	    game.ents[id]=at.ents;	    
	    renderList.push(at.anim);	   
	}
	//renderList.push(__ui.drawMouse(__gameObj,"red"));
	render(renderList,canvas,context,camera,game);
	
	pause(fps,canvas,context,camera,game,time);
	
	};
}


