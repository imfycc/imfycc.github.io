// hexo new 时自动打开 MWeb
/*
var exec = require('child_process').exec;

hexo.on('new', function(data){
    exec('open -a MWeb ' + data.path);
});

*/


// hexo new 时自动打开 vscode
let spawn = require('hexo-util/lib/spawn');

hexo.on('new', (data) => {
  spawn('code', [hexo.base_dir, data.path]);
});
