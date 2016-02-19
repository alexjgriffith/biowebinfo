var __engine= new function(){
    //var __gameObj,__ui;
    this.__gameObj={mouse:{x: 0, y: 0,flag:false,left:false,pcl:false},
	       //click:{flag: false,tflag:false,step: 0,min:5, by: 1, max: 10,speed: 2,n:0,x: 0 ,y: 0,left: false},
	       click:[],
	       keyboard:{ids:[]},	       
	       camera:{},
	       ui:"basic_ui",
	       components:{},
	       ents:{},
	       systems:{},
	       C2E:{},
	       E2C:{},
	       entID:0,
	       ids:[]
		   };
    
    this.__gameObj.makeSystem=function(system,fun){
	this.systems[system]=fun;
    };
   this. __gameObj.makeComponent=function (component,obj){
	this.components[component]=function(){return obj;};
	this.C2E[component]=[];
    };

    this.__gameObj.newComponent=function (component,rep){
	var comp= new this.components[component];
	var keys=Object.keys(rep);
	for(var i=0;i<keys.length;i++){
	    comp[keys[i]]=rep[keys[i]];	    
	}
	return comp;	
    };

    // #makeEnt
    this.__gameObj.makeEnt=function (game,opts){
	var rets= {},
	    keys=Object.keys(opts),
	    i;
	for(i=0;i<keys.length;i++){
	    rets[keys[i]]=game.newComponent(keys[i] ,opts[keys[i]]);
	    game.C2E[keys[i]].push(game.entID);
    }
    game.E2C[game.entID]=keys;
    game.ents[game.entID]=rets;
    game.ids.push(game.entID);
    game.entID+=1;
    return game.entID-1;
    };

    this.__gameObj.remove=function(list,value){
    var outlist=[];
    for(var i=0;i<list.length;i++)
	if(list[i]!=value)
	    outlist.push(list[i]);
    return outlist;
    };

    this.__gameObj.removeEnt=function(game,id){    
    for(var j=0; j< game.E2C[id].length; j++)
	game.C2E[game.E2C[id][j]]=game.remove(game.C2E[game.E2C[id][j]],id);
    game.ents[id]=null;
    game.ids=game.remove(game.ids,id);
    game.E2C[id]=null;
    };

    this.__ui={
	emiter: new EventEmitter(),
	init_ui: function(canvas,game,engine){
	this.engine=engine;
	canvas.addEventListener('mousemove',this.Mtracker(canvas,game), false);
	canvas.addEventListener('mouseup',this.clickAct(canvas,game), false);
	canvas.addEventListener('contextmenu',this.LclickAct(canvas,game), false);
	canvas.addEventListener('mouseout',function(){game.mouse.flag=false;}, false);
	canvas.addEventListener('mouseover',function(e){game.mouse.flag=true;}, false);
	canvas.style.cursor = "none";
	canvas.oncontextmenu = function (e) {e.preventDefault();};
	
    },

    getMousePos: function (canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
	};
    },

	Mtracker: function(canvas,game){
	    var getMousePos=this.getMousePos;
	    var emiter=this.emiter;
	    return function (e){
		var mouse = getMousePos(canvas, e);
		game.mouse.x=mouse.x;
		game.mouse.y=mouse.y;		
		emiter.emitEvent("mtrack");
	    };
    },
    clickAct:
	function(canvas,game){	    
	    return function (e){     
		__engine.__ui.clickFlagSet(e,canvas,game);
		__engine.__ui.emiter.emitEvent("click");
	};
	},
    LclickAct:
	function(canvas,game){
	    var emiter=__engine.__ui.emiter;
	    return function (e){     
		game.mouse.left=true;
		emiter.emitEvent("Lclick");
	};
    },

	clickFlagSet:function (e,canvas,game){

	var mouse = __engine.__ui.getMousePos(canvas, e);
	var tclick={};
	tclick.left=game.mouse.left;
	tclick.x=mouse.x;
	tclick.y=mouse.y;
	tclick.time=Date.now();


	game.mouse.left=false;

	if(__engine.click_savenum>game.click.length)
	    game.click.shift();
	game.click.push(tclick);
    },
    drawMouse:function (game,colour){
	return function(canvas,context,camera){
	    if(game.mouse.flag){
		context.strokeStyle=colour;
	    context.beginPath();
	    context.arc(game.mouse.x,game.mouse.y,5,0,2*Math.PI);
	    context.stroke();
	    context.beginPath();
	    context.arc(game.mouse.x,game.mouse.y,1,0,2*Math.PI);
		context.stroke();};
	};
	
    },
    drawClickAux:function(info,x,y){
	return function(canvas,context,camera){
	    context.beginPath();
		context.arc(x,y,info.step/info.speed,0,2*Math.PI);
		context.stroke();			
	};
	
    }   



    };


    this.call=function(context,canvas,camera){
	this[this.__gameObj["ui"]](canvas,this.__gameObj);
	this.__ui.emiter.addListener("click",function(){
	    var game=__engine.__gameObj;
	    if(! game.click[game.click.length-1].left){
		var id=new makeClick(game,game.click[game.click.length-1].x,
				     game.click[game.click.length-1].y
			    );
	    id();
	}
	});
	this.__ui.emiter.addListener("Lclick",function(){console.log("Left");});
	
	return this.__gameObj;

			      };
    this.basic_ui=function(canvas,game){this.__ui.init_ui(canvas,game);};
    this.ui={click_savenum:25};
    this.__gameObj.__ui=this.__ui;
};
