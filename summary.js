let fs = require('fs'); 
 let createScript = function( path, callback){
    // the callback gets ( err, files) where files is an array of file names
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

let createDirectory = function(){
    fs.mkdir('folder/folder',(err, succ) => {});
    createScript('./folder',function(filePath, stat) {
        for(let i=0;i<stat.length;i++){
            console.log(stat[i]);
            fs.readFile(stat[i],"utf-8", (err, data) => {
                console.log(data);
                let nameFile = path.basename(stat[i]);
                console.log(nameFile);
                if (err)
                    throw err;
                fs.open('folder/folder/'+nameFile, 'w',(err, fd) => {});
                fs.writeFile('./folder/folder/'+nameFile, data,(err) => {
                    if (err)
                        throw err;
                    console.log('The file has been saved!');
                });
            });
        }
    });
};

createDirectory();