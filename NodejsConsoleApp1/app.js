define = require('node-requirejs-define');
'use strict';

function JsToJson(source) {
    var outputOptionFilePath = source.replace("./", "./output/").replace(".js", ".json");
    var x = require(source);
    var json = JSON.stringify(x, null, 4);
    var fs = require('fs');
    fs.writeFile(outputOptionFilePath, json);
}

JsToJson('./options/option1.js');


