
'use strict';
function TravelDirectory(sourceDir, onFileProcessFunc) {
    var fsHelper = require('fs');
    var entries = fsHelper.readdirSync(sourceDir);
    entries.forEach(function (entry) {
        if (fsHelper.statSync(sourceDir + '/' + entry).isDirectory()) {
            TravelDirectory(sourceDir + '/' + entry, onFileProcessFunc);
        } else {
            var file = sourceDir + '/' + entry;
            //if (file.endsWith(".js")) {
                onFileProcessFunc(file);
            //}
        }
    });
}

module.exports = TravelDirectory;