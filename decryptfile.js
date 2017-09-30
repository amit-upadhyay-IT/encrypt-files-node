var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6FAjkdlfAjk';

var fs = require('fs');
var zlib = require('zlib');

var inputFilePath = 'file.out';

password = get32Bytes(password);

readFirstLine(inputFilePath);

function readFirstLine(path)
{
    var rs = fs.createReadStream(path, {encoding:'utf8'});
    var actual_iv = "";
    rs.on('data', function (chunk) {
        var index = chunk.indexOf(':');
        actual_iv = chunk.substr(0, index);
        rs.close();
    });
    rs.on('close', function () {
        // call the function which requires main concern
        decryptTheFile(new Buffer(actual_iv, 'hex'));
    });
}

function decryptTheFile(iv)
{

    // input file
    var r = fs.createReadStream('file.out');
    // zip content
    var zip = zlib.createGzip();
    // encrypt content
    var encrypt = crypto.createCipheriv(algorithm, password, iv);
    // decrypt content
    var decrypt = crypto.createDecipheriv(algorithm, password, iv);
    // unzip content
    var unzip = zlib.createGunzip();
    // write file
    var w = fs.createWriteStream('file.out.test');

    // start pipe
    r.pipe(decrypt).pipe(unzip).pipe(w);

}

function get32Bytes(text)
{
    while (text.length <= 32)
        text += text;
    return text.substr(0,32);
}

