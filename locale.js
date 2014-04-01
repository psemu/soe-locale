#!/usr/bin/env node
var fs = require("fs"),
    locale = require("./soe-locale.js");

var mode = process.argv[2];

switch (mode) {
    case "parse": 
        var inPathData = process.argv[3],
            inPathIndex = process.argv[4],
            outPath = process.argv[5];
        if (!fs.existsSync(inPathData)) {
            throw "inPathData does not exist: "  + inPathData;
        }
        if (!fs.existsSync(inPathIndex)) {
            throw "inPathIndex does not exist: "  + inPathIndex;
        }
        console.log("Reading index and string data...");
        locale.parse(inPathData, inPathIndex, function(err, strings) {
            if (!err) {
                console.log("Writing locale data to file: " + outPath);
                fs.writeFile(outPath, JSON.stringify(strings, null, 4));
                console.log("Done!");
            } else {
                throw err;
            }
        });
        break;
    case "write": 
        var inPath = process.argv[3],
            outPathData = process.argv[4],
            outPathIndex = process.argv[5];

        if (!fs.existsSync(inPath)) {
            throw "inPath does not exist: "  + inPath;
        }
        console.log("Reading string data...");
        var stringData = fs.readFileSync(inPath);

        console.log("Parsing JSON...");
        var strings = JSON.parse(stringData);

        console.log("Writing string and index data to " + outPathData + " and " + outPathIndex);

        locale.write(strings, outPathData, outPathIndex, function(err) {
            if (!err) {
                console.log("Done!");
            } else {
                throw err;
            }
        });
        break;
    default:
        console.log("Usage: node locale.js <mode> ...");
}

