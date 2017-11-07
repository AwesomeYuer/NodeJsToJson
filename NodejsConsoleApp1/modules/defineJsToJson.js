'use strict';


function DefineJsToJson(source, sourceRootDir, destRootDir) {
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

module.exports = DefineJsToJson;