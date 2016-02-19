var __engine=new function(){
    var C2E={};
    var E2C={};
    var systems={};
    var ents={};
    var components={};
    var id=0;
    this.getnextID=function(){var ids=id; id+=1;return ids;};
    this.printGameObj=function (){    
	var data={C2E:C2E,
		  E2C:E2C,
		  ents:ents};
	return JSON.stringify(data);
    };
    this.loadGameObj=function (data){    
	var pd =JSON.parse(data);
	C2E=pd ["C2E"];
	E2C=pd ["E2C"];
	ents=pd ["ents"];
	return this.printGameObj();
    };
    this.newEnt = function(name){
	var myid=this.getnextID();
	E2C[name]=[];	
	ents[id]={};
    };
    
    this.addComp =function(myid,comp,values){
	var keys=Object.keys()
	ents[myid][comp]=componets[comp];
	
    };
    this.defComp = function(name,obj){
	C2E[name]=[];
	components[name]=obj;
    };
    //this.defSystem
    
    
    return 0;
};
