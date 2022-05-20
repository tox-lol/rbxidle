const bytenode = require('bytenode');

const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

if(fs.existsSync(path.join(__dirname, 'temp.js'))) {
    console.log("FOUNDDDDDDDDDDDD");
    createJSC();
}
const myFile = require('./main.jsc');
myFile;


function createJSC() {
    const bytenode = require("bytenode");
    let compiledFilename = bytenode.compileFile({
        filename: './temp.js',
        output: './main.jsc'
    });
}