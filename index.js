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

let fileCreate = function (z) {
    fs.open('./summary.js', 'w',(err, fd) => {});
    fs.writeFile("./summary.js","let fs = require('fs'); \n let createScript = function( path, callback){\n" +
        "    // the callback gets ( err, files) where files is an array of file names\n" +
        "    if( typeof callback !== 'function' )\n" +
        "        return ;\n" +
        "    let result = [], files = [ path.rep" +
        "lace( /\\/\\s*$/, '' ) ];\n" +
        "    function traverseFiles (){\n" +
        "        if( files.length ) {\n" +
        "            let name = files.shift();\n" +
        "            fs.stat(name, function( err, stats){\n" +
        "                if( err ){\n" +
        "\n" +
        "                    if( err.errno == 34 )\n" +
        "                        traverseFiles();\n" +
        "                    else callback(err)\n" +
        "                }\n" +
        "                else if ( stats.isDirectory())\n" +
        "                    fs.readdir( name, function( err, files2 ){\n" +
        "                    if( err )\n" +
        "                        callback(err)\n" +
        "                    else {\n" +
        "                        files = files2\n" +
        "                            .map( function( file ){ return name + '/' + file } )\n" +
        "                            .concat( files )\n" +
        "                        traverseFiles()\n" +
        "                    }\n" +
        "                });\n" +
        "                else{\n" +
        "                    result.push(name);\n" +
        "                    traverseFiles()\n" +
        "                }\n" +
        "            })\n" +
        "        }\n" +
        "        else callback( null, result )\n" +
        "    }\n" +
        "    traverseFiles()\n" +
        "};\n" +
        "\n" +
        "createScript('./folder',function(filePath, stat) {\n" +
        "    console.log(stat);\n" +
        "});", (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
};


fileCreate('');
//endregion
