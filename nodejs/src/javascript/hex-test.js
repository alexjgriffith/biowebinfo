/*
  Notes:
  1.) Create a set of center locations for an n/m map
  a.) pass in n,m and r, recive a hash of x,y tuples
      where the hash is convertable to the x and yth 
      location by Math.floor(x/n) x%n
*/

function hexMap(n,m,r){
    return 0;
}

function hex(r,x,y,start){
    var angles=[0,60,120,180,240,300,360];
    
    var fagA=function(xin) {
	var an=xin*Math.PI/180;
	var sign=-1 ;
	if(angles>180)
	    sign=1;
	return [an,sign];
    };    
    var fag=function(xin) {
	var t= fagA(xin),
	    sign=t[1],
	    an=t[0];	
	return [sign*Math.sin(an)*r+yf,Math.cos(an)*r+xf];
    };
    var temp=fagA(angles[start]);
    var yf= y-temp[1]*Math.sin(temp[0])*r;
    var xf= x-Math.cos(temp[0])*r;
    var col=[];
    for(var i=0;i<angles.length;i++)
	col.push(fag(angles[i]));
    return col;
}

function drawHex(context,results){
    context.beginPath();
    context.moveTo(results[0][0],results[0][1]);
    for(var i=1;i<7;i++){
	context.lineTo(results[i][0],results[i][1]);

    }
    context.closePath();
    context.stroke();
}

function main(){
    var body=document.getElementById("body");
    var canvas = document.createElement("canvas");
    var context=canvas.getContext("2d");
    canvas.setAttribute("width",400);
    canvas.setAttribute("height",400);
    body.appendChild(canvas);

    var pa=function(a){console.log("x: "+(a[0][0]+a[3][0])/2+" y:"+(a[0][1]+a[3][1])/2); return a;};
    var a=hex(3,10,10,0);
    console.log("x: "+(a[0][0]+a[3][0])/2+" y:"+(a[0][1]+a[3][1])/2);
    drawHex(context,pa(hex(1,10,10,2)));
    drawHex(context,hex(50,200,200,2));
    
    
    

        /*
    var c;
    canvas.setAttribute("width",400);
    canvas.setAttribute("height",400);
    body.appendChild(canvas);
    console.log("complete");
    c=hex(context,10,20,10,2,4);
    console.log(c);
    context.strokeStyle="red";
    c=hex(context,10,c[1],c[0],2,4);
    console.log(c);
    c=hex(context,10,c[1],c[0],2,6);
    c=hex(context,10,c[1],c[0],2,1);
    c=hex(context,10,c[1],c[0],5,1);
    c=hex(context,10,c[1],c[0],5,1);
    c=hex(context,10,c[1],c[0],5,5);
    c=hex(context,10,c[1],c[0],3,5);
    c=hex(context,10,c[1],c[0],1,5);
    c=hex(context,10,c[1],c[0],1,5);
    c=hex(context,10,c[1],c[0],1,5);
    c=hex(context,10,c[1],c[0],1,5);
    c=hex(context,10,c[1],c[0],1,5);
    c=hex(context,10,c[1],c[0],1,5);
    c=hex(context,10,c[1],c[0],1,1);
    c=hex(context,10,c[1],c[0],3,1);
    c=hex(context,10,c[1],c[0],5,1);
    c=hex(context,10,c[1],c[0],5,1);
    c=hex(context,10,c[1],c[0],5,1);
    c=hex(context,10,c[1],c[0],5,1);
    c=hex(context,10,c[1],c[0],5,1);
    c=hex(context,10,c[1],c[0],5,1);
    
    c=hex(context,10,c[1],c[0],5,5);
    c=hex(context,10,c[1],c[0],3,5);
    
    c=hex(context,10,c[1],c[0],1,5);
    c=hex(context,10,c[1],c[0],1,5);
*/
}


/*function hex(context, length,x,y,n,m){    
    var angles=[0,60,120,180,240,300,360];
    
    var fagA=function(xin) {
	var an=xin*Math.PI/180;
	var sign=-1 ;
	if(angles>180)
	    sign=1;
	return [an,sign];
    };    
    var fag=function(xin) {
	var t= fagA(xin),
	    sign=t[1],
	    an=t[0];	
	return [sign*Math.sin(an)*length+yf,Math.cos(an)*length+xf];
    };
    var temp=fagA(angles[n]);
    var yf= y-temp[1]*Math.sin(temp[0])*length;
    var xf= x-Math.cos(temp[0])*length;
    
    context.beginPath();
    context.moveTo(fag(angles[0])[1],fag(angles[0])[0]);
    for(var i=1;i<7;i++){
	context.lineTo(fag(angles[i])[1],fag(angles[i])[0]);

    }
    context.closePath();
    context.stroke();
    return fag(angles[m]);

}

*/
