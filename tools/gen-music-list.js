var fs =require('fs');

var scanMusic = function(){
	var path = '../minecraft-text-mode/assets/music';
	var workList = [];
	
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
		} 
	};  
	
	//render and output
	var js = '';
	var html = '';
	
	for(i=0;i<workList.length;i++){
		var id=workList[i].replace('/','-').replace('.','-');
		js+='game.Music.regMusic("#'+id+'")\n';
		html+='<audio src="./assets/'+workList[i]+'" id="'+id+'"  preload="auto"></audio>\n';
	}
	
	js+='game.Music.onAllReg()\n';
	
	fs.writeFile('./gen/music.js',js);
	fs.writeFile('./gen/music.html',html);
}

scanMusic();