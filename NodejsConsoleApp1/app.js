define = require('node-requirejs-define');
'use strict';

JsToJson('./options/option1');

function JsToJson(source) {
    var outputOptionFilePath = source.replace(".", "./output");
    var x = require(source);
    var fs = require('fs');
    fs.writeFile(outputOptionFilePath + '.json', JSON.stringify(x, null, 4));
}
