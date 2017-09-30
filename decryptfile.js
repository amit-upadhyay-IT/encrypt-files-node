var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6FAjkdlfAjk';

var fs = require('fs');
var zlib = require('zlib');

var iv = new Buffer(get16Bytes(password));
password = get32Bytes(password);


// input file
var r = fs.createReadStream('file.out');
// zip content
var zip = zlib.createGzip();
// encrypt content
var encrypt = crypto.createCipheriv(algorithm, password, iv);
// decrypt content
var decrypt = crypto.createDecipheriv(algorithm, password, iv)
// unzip content
var unzip = zlib.createGunzip();
// write file
var w = fs.createWriteStream('file.out.test');

// start pipe
r.pipe(decrypt).pipe(unzip).pipe(w);


function get16Bytes(text)
{
    while (text.length <= 16)
        text += text;
    return text.substr(0, 16);
}

function get32Bytes(text)
{
    while (text.length <= 32)
        text += text;
    return text.substr(0,32);
}
