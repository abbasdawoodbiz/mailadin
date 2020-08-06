#! /usr/bin/env node
let fs = require('fs');

/* Utility Functions*/
function writeTemplate(content, filename){
    fs.writeFile(__dirname + `/../output/${filename}.html`, content, (err)=>{
        if(err){
            console.error(err);
        } else {
            console.log('done!');
        }
    });
}

module.exports = {
    writeTemplate: writeTemplate
}