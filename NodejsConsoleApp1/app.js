define = require('node-requirejs-define');
'use strict';

function TravelDirectory(sourceDir, onFileProcessFunc) {
    var fsHelper = require('fs');
    var entries = fsHelper.readdirSync(sourceDir);
    entries.forEach(function (entry) {
        if (fsHelper.statSync(sourceDir + '/' + entry).isDirectory()) {
            TravelDirectory(sourceDir + '/' + entry, onFileProcessFunc);
        } else {
            var file = sourceDir + '/' + entry;
            if (file.endsWith(".js")) {
                onFileProcessFunc(file);
            }
        }
    });
}  

function JsToJson(source, sourceRootDir, destRootDir) {
    var regExp = new RegExp(sourceRootDir, "ig");
    var outputFilePath = source.replace(regExp, destRootDir).replace(".js", ".json");
    var fseHelper = require('fs-extra');
    var fsHelper = require('fs');
    if (!fsHelper.existsSync(destRootDir)) {
        fseHelper.mkdirpSync(destRootDir);
    }
    var pathHelper = require('path');
    var destDir = pathHelper.dirname(outputFilePath);
    if (!fsHelper.existsSync(destDir)) {
        fseHelper.mkdirpSync(destDir);
    }
    var jsonObject = require(source);
    var json = JSON.stringify(jsonObject, null, 4);
    fsHelper.writeFileSync(outputFilePath, json);
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


