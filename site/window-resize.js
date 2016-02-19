var services;
var makeBig;
var news;
var meet;
var contact;
var about;
var login;

var conv={0:"services",1:"news",2:"meet",3:"contact",4:"login",5:"about"};

var data={
    services:{
	title:["Bio Web Info","Our NGS Analysis Services","We will be providing bioinformatics soon ...<br> for the time being please browse the outputs of our current analysis pipeline.","fail()"],
	webposts:[["Full Genome Alignment","BWA or BowTie","","makeBig(0,0)"],
	["Read Alignment","BWA or BowTie","","makeBig(0,1)"],
	["ChIP-Seq Analysis","MACS","","makeBig(0,2)"],
	["RNA-Seq Analysis","DESeq","","makeBig(0,3)"],
	["Motif Denovo","Using Homer","","makeBig(0,4)"],
	["Visualization","Genome Browser Integration","","makeBig(0,5)"],
		  ["Functional Analysis","GO and GSEA","","makeBig(0,6)"]]},
    news: {
	title:["Bio Web Info","News","Keeping you up to date on the development of our project.","fail()"],
	webposts:[["The Web Site is Live","Feb 12 16",
		   "On Thursday the 12 of February we launched the biowebinfo website. Currently it is in a developmental stage, however their is dynamic content in the pipeline.","makeBig(1,0)"]]},
    meet: {title:["Bio Web Info","The Members","Currently our project has two members. ","fail()"],
	   webposts:[["Alexander Griffith","Technical Lead",
		       "Our lead technical developer has been responsible for the scaling of our analysis capacity. He is currently completing his masters in Bio-medical Engineering at the University of Ottawa. ","makeBig(2,0)"],
		     ["Adrian Rasul","Level 5 Financial Wizard","Adrian completed his degree in management and economics at the University of Guelph in 2012.","makeBig(2,1)"]]},
    contact: {
	title:["Bio Web Info","Contacts","Comming soon ...","fail()"],
	webposts:[]
    },
    login:{title:["Bio Web Info","Login","Comming soon ...","fail()"], webposts:[]},
    about:{title:["Bio Web Info","About","Comming soon ...","fail()"], webposts:[]}
};
var accum=0;

function rsf(posts,widths){    
  return function(){
      var width=window.innerWidth;
      //chose the largest width that
      // covers 100% of the screen
      var ret=widths[0];
      for(var i=1;i<widths.length;i++){
	  if(widths[i]< width)
	      ret=widths[i];	  
      }
      posts.setAttribute("style","width:"+ret+"px");
  };
}

function main (){
    var posts=document.getElementById("conts");
    makeBig=createMakeBig(posts);
    services=buildPage(posts,"services");
    news=buildPage(posts,"news");
    login=buildPage(posts,"login");
    meet=buildPage(posts,"meet");
    contact=buildPage(posts,"contact");
    about=buildPage(posts,"about");
    services();
}

function makePage(title,webposts){
    var collect="";
    collect+=createHeaderHTML.apply(null,title);
    for(var i=0; i<webposts.length;i++)
	collect+=createPostHTML.apply(null,webposts[i]);    
    return "<div id='posts'>"+collect+"</div>";
}

function buildPage(posts,name){
    return function(){
	var widths =[450,900,1350];
	console.log(accum);
	accum+=1;
	posts.innerHTML=makePage(data[name]["title"],data[name]["webposts"]);
	var postsr=document.getElementById("posts");
	var resize=rsf(postsr,widths);
	resize();
	window.onresize = resize;

	return(false);};
}

function createMakeBig(posts){
    return function (name,id){
	var lit=data[conv[name]]["webposts"][id];
	posts.innerHTML=createFullHTML(lit[0],lit[1],lit[2],"fail()");
    return false;
    };
};

function fail(){
    return false;
}

function createHeaderHTML(title,subtitle,words,fun){
    var $ = window.jsrender;
    $.templates("bf","<div class='one-header'><header id='tblock'>"+
		"<h1  style='margin-bottom:0px;margin-top:0px;'>{{:title}}</h1>"+
		"<h2  'style='margin-bottom:0px;margin-top:0px;'>{{:subtitle}}</h2>"+
		"<span> {{:words}} </span>"+
		"</header></div>");
    var input={title:title,subtitle:subtitle,words:words,fun:fun};
    var html= $.templates.bf(input);
    return html;
}

function createFullHTML(title,subtitle,words,fun){
    var $ = window.jsrender;
    $.templates("bf","<div id='column'><div id='full'>"+
		"<header><h1 id='ph1'>{{:title}}</h1><h2 id='ph2'>{{:subtitle}}</h2></header> <p id='fp1'>{{:words}}</p> </div></div>");
    var input={title:title,subtitle:subtitle,words:words,fun:fun};
    var html= $.templates.bf(input);
    return html;
}

function createPostHTML(title,subtitle,words,fun){
    var $ = window.jsrender;
    $.templates("bf","<div id='post'><a style='text-decoration:none;' onclick='return {{:fun}}' href=''><hgroup style='padding:0;'><header><h1 id='ph1'>{{:title}}</h1><h2 id='ph2'>{{:subtitle}}</h2> </hgroup></header><p  class='article'>{{:words }}</p>  </a></div>");
    var input={title:title,subtitle:subtitle,words:words,fun:fun};
    var html= $.templates.bf(input);
    return html;
}
