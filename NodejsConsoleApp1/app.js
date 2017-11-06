define = require('node-requirejs-define');
'use strict';

function Travel(sourceDir, onFileProcess) {
    var fs = require('fs');
    var directories = fs.readdirSync(sourceDir);
    directories.forEach(function (item) {
        if (fs.statSync(sourceDir+ '/' + item).isDirectory()) {
            Travel(sourceDir + '/' + item);
        } else {
            var file = sourceDir + '/' + item;
            if (file.endsWith(".js")) {
                onFileProcess(file);
            }
        }
    });
}  

function JsToJson(source, sourceRootDir, destRootDir) {
    var regExp = new RegExp(sourceRootDir, "ig");
    var outputOptionFilePath = source.replace(regExp, destRootDir,).replace(".js", ".json");
    var x = require(source);
    var json = JSON.stringify(x, null, 4);
    var fs = require('fs');
    fs.writeFileSync(outputOptionFilePath, json);
}
/*
dir /b /s *.js >a.txt
*/

Travel('e:/temp/options', function (file) {
    JsToJson(file, 'E:/Temp/', 'e:/temp/output/');
});


//JsToJson('E:/Temp/options/option2.js'       , 'E:/Temp/', 'e:/temp/output/');
//JsToJson('E:/Temp/options/option3.js'       , 'E:/Temp/', 'e:/temp/output/');
//JsToJson('E:/Temp/options/option4.js'       , 'E:/Temp/', 'e:/temp/output/');
//JsToJson('E:/Temp/options/option5.js'       , 'E:/Temp/', 'e:/temp/output/');


