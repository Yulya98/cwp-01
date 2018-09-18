let fs = require('fs');
 let createScript = function( path, callback){
    if( typeof callback !== 'function' )
        return ;
    let result = [], files = [ path.replace( /\/\s*$/, '' ) ];
    function traverseFiles (){
        if( files.length ) {
            let name = files.shift();
            fs.stat(name, function( err, stats){
                if( err ){

                    if( err.errno == 34 )
                        traverseFiles();
                    else callback(err)
                }
                else if ( stats.isDirectory())
                    fs.readdir( name, function( err, files2 ){
                    if( err )
                        callback(err)
                    else {
                        files = files2
                            .map( function( file ){ return name + '/' + file } )
                            .concat( files )
                        traverseFiles()
                    }
                });
                else{
                    result.push(name);
                    traverseFiles()
                }
            })
        }
        else callback( null, result )
    }
    traverseFiles()
};

createScript('./folder',function(filePath, stat) {
    console.log(stat);
});

const path = require('path');
let watching = false;

let createDirectory = function(){
    fs.mkdir('folder/folder',(err, succ) => {});
    createScript('./folder',function(filePath, stat) {
        for(let i=0;i<stat.length;i++){
            fs.readFile(stat[i],"utf-8", (err, res) => {
                let nameFile = path.basename(stat[i]);
                if (err)
                    throw err;
                fs.open('folder/folder/'+nameFile, 'w',(err, fd) => {});
                fs.readFile('./folder/config.json', 'utf-8', function (err, data) {
                    if(err)
                        throw err;
                    let obj = JSON.parse(data);
                    fs.writeFile('./folder/folder/'+nameFile,obj.copyright + res + obj.copyright,(err) => {
                        if (err)
                            throw err;
                    });
                });
            });
        }
    });
};

createDirectory();

let watchFiles = function () {
    fs.watch('./folder/folder', { encoding: 'utf-8' }, (eventType, filename) => {
        if (watching === true) {
            console.log(filename);
        }
    });
};

watchFiles();