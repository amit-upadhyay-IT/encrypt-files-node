var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6FAjkdlfAjk';

var stream = require('stream');
var fs = require('fs');
var zlib = require('zlib');

var iv = crypto.randomBytes(16);// i6 bytes iv is required
password = get32Bytes(password);
var hexiv = iv.toString('hex');

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

// creating a hidden file where the iv will get stored
var ivwritable = fs.createWriteStream('./.ivfile');
var Readable = stream.Readable;
var s = new Readable();
s._read = function noop() {};
s.push(hexiv);
s.push(null);
//s.pipe(zlib.createGzip()).pipe(w, {end: false});// this is one way where I am zipping it without encrypting it, but the question is what would happen to ':' which I have used as a delimiter to get the iv while decryption.
// So I am directly putting the iv without zipping it.
s.pipe(ivwritable);

// start pipe
//r.pipe(zip).pipe(encrypt).pipe(decrypt).pipe(unzip).pipe(w);

s.on('end', function(){
    r.pipe(zip).pipe(encrypt).pipe(w);
});

//r.pipe(zip).pipe(encrypt).pipe(w);

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
