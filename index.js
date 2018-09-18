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
let path = process.argv[2];

let fileCreate = function () {
    fs.open('./summar.js', 'w',(err, fd) => {});
    fs.writeFile("./summar.js","let fs = require('fs');\n" +
        "\n" +
        " let createScript = function( path, callback){\n" +
        "    if( typeof callback !== 'function' )\n" +
        "        return ;\n" +
        "    let result = [], files = [ path.replace( /\\/\\s*$/, '' ) ];\n" +
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
        "createScript('"+path+"',function(filePath, stat) {\n" +
        "    for(let i = 0;i<stat.length;i++) {\n" +
        "        console.log(stat[i].replace('"+path+"',''));\n" +
        "    }\n" +
        "});\n" +
        "\n" +
        "const paths = require('path');\n" +
        "\n" +
        "let createDirectory = function(){\n" +
        "    fs.mkdir('"+path.replace("./","")+"/"+path.replace("./","")+"',(err, succ) => {});\n" +
        "    createScript('"+path+"',function(filePath, stat) {\n" +
        "        for(let i=0;i<stat.length;i++){\n" +
        "            fs.readFile(stat[i],\"utf-8\", (err, res) => {\n" +
        "                let nameFile = paths.basename(stat[i]);\n" +
        "                if (err)\n" +
        "                    throw err;\n" +
        "                fs.open('"+path.replace("./","")+"/"+path.replace("./","")+"/"+"'+nameFile, 'w',(err, fd) => {});\n" +
        "                fs.readFile('"+path+"/config.json', 'utf-8', function (err, data) {\n" +
        "                    if(err)\n" +
        "                        throw err;\n" +
        "                    let obj = JSON.parse(data);\n" +
        "                    fs.writeFile('"+path+"/"+path.replace("./","")+"/'+nameFile,obj.copyright + res + obj.copyright,(err) => {\n" +
        "                        if (err)\n" +
        "                            throw err;\n" +
        "                    });\n" +
        "                });\n" +
        "            });\n" +
        "        }\n" +
        "    });\n" +
        "};\n" +
        "\n" +
        "createDirectory();\n" +
        "\n" +
        "let watchFiles = function () {\n" +
        "    fs.watch('"+path+"/"+path.replace("./","")+"', { encoding: 'utf-8' }, (eventType, filename) => {\n" +
        "            console.log(filename);\n" +
        "    });\n" +
        "};\n" +
        "\n" +
        "setTimeout(() =>watchFiles(),4000 );", (err) => {
        if (err) throw err;
    });
};


fileCreate('');
//endregion
