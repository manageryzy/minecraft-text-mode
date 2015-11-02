var fs =require('fs');

var path = '../minecraft-text-mode/assets/sound';
var workList = [];

var scanSound = function(path){	
	var files = fs.readdirSync(path);
	for(var i=0;i<files.length;i++) {  
		var item = files[i];
		var tmpPath = path + '/' + item,
			stats = fs.statSync(tmpPath);

		if (!stats.isDirectory()) {  
			var name = item.split('.',2);
			if(name[1]=='ogg'){
				workList.push(tmpPath.split('/').slice(3).join('/'));
			}
		} else{
			scanSound(tmpPath);
		}
	};  
}

scanSound(path);
//render and output
var js = '';
var html = '';

for(var i=0;i<workList.length;i++){
	var id=workList[i].replace(/\//ig,'-').replace(/ /ig,'-');
	js+='Game.Sound.regSound("#'+id+'")\n';
	html+='<audio src="./assets/'+workList[i]+'" id="'+id+'"></audio>\n';
}

fs.writeFile('./gen/sound.js',js);
fs.writeFile('./gen/sound.html',html);