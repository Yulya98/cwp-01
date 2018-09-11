//region Task_1
const name = process.argv[2];

console.log(`Hi ${name}!`);
//endregion


//region Task_2
for(var i = 0; i<process.argv.length; i++) {
    console.log(`next item: ${process.argv[i]} \n`);
}
//endregion


//region Task_3
var fs = require('fs');
var path = require('path');

var getFiles = function (dir, files_){

    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name.replace(/\.\/folder\//g,''));
        }
    }
    return files_;
};


console.log(getFiles('./folder'));
//endregion
