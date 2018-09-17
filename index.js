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
//endregion
