var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6FAjkdlfAjk';

var fs = require('fs');
var zlib = require('zlib');

// input file
var r = fs.createReadStream('file.out');
// zip content
var zip = zlib.createGzip();
// encrypt content
var encrypt = crypto.createCipher(algorithm, password);
// decrypt content
var decrypt = crypto.createDecipher(algorithm, password)
// unzip content
var unzip = zlib.createGunzip();
// write file
var w = fs.createWriteStream('file.out.test');

// start pipe
r.pipe(decrypt).pipe(unzip).pipe(w);

