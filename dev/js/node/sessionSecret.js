var crypto = require('crypto')
var fs = require('fs')

var filepath = './secrets.txt';

function readSecretKey() {
    return new Promise(function(resolve, reject) {
        fs.readFile(filepath, 'utf8', function(err, key) {
            if (err) {
                reject(err);
            } else {
                resolve(key);
            }
        });
    });
}

function writeSecretKey(key) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(filepath, key, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(key);
            }
        });
    });
}

function generateSecret() {
    return new Promise(function(resolve, reject) {
        crypto.randomBytes(48, function(err, buf) {
            if(err) {
                reject(err);
            } else {
                resolve(buf.toString('hex'));
            }
        });
    });
}

module.exports.getOrCreate = function() {
    return new Promise(function(resolve, reject) {
        readSecretKey()
            .then(function(key) {
                console.log("Key exists: " + key);
                resolve(key);
            }, function() {
                console.log("Key does not exists. Generating...");
                return generateSecret();
            })
            .then(function(key) {
                if (key) {
                    console.log("Key generated: " + key);
                    return writeSecretKey(key);
                }
            }).then(function(key) {
                    if (key) {
                        resolve(key);
                    }
                }, function(err) {
                    reject(err);
                });     
    });
};