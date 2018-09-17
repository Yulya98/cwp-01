var fs = require('fs');
var path = require('path');

var getFiles = function (dir,files_){

    files_ = files_ || [];
    var files = fs.readdir(dir, function (err, data) {
        debugger;
        for (var i in data){
            debugger;
            var name = dir + '/' + data[i];
            if (fs.stat(name, function (err, data) {
                return data;
            }).isDirectory()){
                getFiles(name, files_);
            } else {
                if(flag == false || typeof flag == 'undefined') {
                    files_.push(name.replace(/\.\/folder\//g, ''));
                }
                else {
                    files_.push(name);
                }
            }
        }
        return files_;
    });
};

var createOtherDirectory = function () {
    var arrayPath = getFiles('./folder',true);
    for(var i = 0; i<arrayPath.length;i++) {
        fs.readFile(arrayPath[i], "utf8",
            function (error, data) {
                if (error)
                    throw error;
                console.log(data);
            });
    }
}


console.log(getFiles('./folder'));