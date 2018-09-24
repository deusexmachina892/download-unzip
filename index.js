const request = require('superagent');
const unzip = require('unzip');
const fs = require('fs');

const href = `declare-the-link-to-the-zip-folder-here`;
const zipFile = 'file.zip';//find out and declare the name of the zipfile here

const destFolder = '/destFolder'; //define the destination path where you want to store the extracted files/folders 
const source = `${href}/${zipFile}`;
const dirPath = __dirname +'/'+ zipFile;
const destPath = __dirname+ destFolder;


request
    .get(source)
    .on('error', function(error){
        console.log(error);
    })
    .pipe(fs.createWriteStream(zipFile))
    .on('finish', function(){
        console.log('Successfully downloaded');
        console.log('start unzip');
        fs.createReadStream(dirPath)
            .pipe(unzip.Extract({path: destPath}))
        console.log('Finished unzipping');
    });

