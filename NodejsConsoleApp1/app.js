define = require('node-requirejs-define');
'use strict';

function TravelDirectory(sourceDir, onFileProcessFunc) {
    var fs = require('fs');
    var directories = fs.readdirSync(sourceDir);
    directories.forEach(function (item) {
        if (fs.statSync(sourceDir + '/' + item).isDirectory()) {
            TravelDirectory(sourceDir + '/' + item, onFileProcessFunc);
        } else {
            var file = sourceDir + '/' + item;
            if (file.endsWith(".js")) {
                onFileProcessFunc(file);
            }
        }
    });
}  

function JsToJson(source, sourceRootDir, destRootDir) {
    var regExp = new RegExp(sourceRootDir, "ig");
    var outputFilePath = source.replace(regExp, destRootDir).replace(".js", ".json");
    var fse = require('fs-extra');
    var fs = require('fs');
    if (!fs.existsSync(destRootDir)) {
        fse.mkdirpSync(destRootDir);
    }
    var path = require('path');
    var destDir = path.dirname(outputFilePath);
    if (!fs.existsSync(destDir)) {
        fse.mkdirpSync(destDir);
    }
    var jsonObject = require(source);
    var json = JSON.stringify(jsonObject, null, 4);
    fs.writeFileSync(outputFilePath, json);
}
/*
dir /b /s *.js >a.txt
*/

TravelDirectory('e:/temp/options', function (file) {
    JsToJson(file, 'E:/Temp/', 'e:/temp/output/');
});


//JsToJson('E:/Temp/options/option2.js'       , 'E:/Temp/', 'e:/temp/output/');
//JsToJson('E:/Temp/options/option3.js'       , 'E:/Temp/', 'e:/temp/output/');
//JsToJson('E:/Temp/options/option4.js'       , 'E:/Temp/', 'e:/temp/output/');
//JsToJson('E:/Temp/options/option5.js'       , 'E:/Temp/', 'e:/temp/output/');


