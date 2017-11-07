define = require('node-requirejs-define');
'use strict';

var travelDirectoryHelper = require('./modules/TravelDirectory');

var defineJsToJsonHelper = require('./modules/DefineJsToJson');

var sourceDir = 'E:/Temp/en-US/en-US/Common/option';

var sourceRootDir = 'E:/Temp/en-US/';

var destRootDir = 'e:/temp/output2/';

var i = 0;
var j = 0;

travelDirectoryHelper(sourceDir, function (file) {
    try {
        if (file.endsWith(".js")) {
            defineJsToJsonHelper(file, sourceRootDir, destRootDir);
            i++;
        }
    } catch (err) {
        console.log("err: " + file);
        j ++;
    }
});
console.log("success: " + i);
console.log("error: " + j);



