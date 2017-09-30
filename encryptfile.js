var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6FAjkdlfAjk';

var fs = require('fs');
var zlib = require('zlib');

var iv = new Buffer(get16Bytes(password));
password = get32Bytes(password);
var hexiv = iv.toString('hex');
console.log('hex iv: ', hexiv);
var buffiv = new Buffer(hexiv, 'hex');
console.log(buffiv.toString());

// input file
var r = fs.createReadStream('file.txt');
// zip content
var zip = zlib.createGzip();
// encrypt content
var encrypt = crypto.createCipheriv(algorithm, password, iv);
// decrypt content
var decrypt = crypto.createDecipheriv(algorithm, password, iv)
// unzip content
var unzip = zlib.createGunzip();
// write file
var w = fs.createWriteStream('file.out');
w.write(hexiv+':');

// start pipe
//r.pipe(zip).pipe(encrypt).pipe(decrypt).pipe(unzip).pipe(w);

r.pipe(zip).pipe(encrypt).pipe(w);

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
