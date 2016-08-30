const async = require('async')
const fs = require('fs');
const spawn = require('child_process').spawn;

const ionicConfPath = "./ionic.config.json"

function assignPath(path){
    return function(callback){
        callback(null,path);
    }
}

function writeFile(path, callback){
    fs.writeFile(path, '{}', (err) => {
        if(err){
            callback(err);
        } else{
            callback(null, path);
        }
    });
}

function runIonicResources(path,callback){
    const ionic = "./node_modules/.bin/ionic";
    const resource = spawn('node', [ionic, 'resources']);

    resource.stdout.on('data', (data) => {
        process.stdout.write(data);
    });

    resource.stderr.on('data', (data) => {
        process.stderr.write(data);
    });

    resource.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        callback(null, path);
    });
}

function removeFile(path,callback){
    fs.unlink(ionicConfPath, (err) => {
        if(err){
            callback(err);
        } else {
            callback(null,path)
        }
    });
}

async.waterfall([
    assignPath(ionicConfPath),
    writeFile,
    runIonicResources,
    removeFile    
], (err) => {
    if(err) throw err;
    console.log('done')
});
