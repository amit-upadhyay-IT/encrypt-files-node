var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6FAjkdlfAjk';

var fs = require('fs');
var zlib = require('zlib');

var find = require('find');

password = get32Bytes(password);

var ivFileData = fs.readFileSync('./.ivfile', 'utf8');
var ivBuf = new Buffer(ivFileData, 'hex');

find.file(/\.amit$/, __dirname, function(files) {

    for (var i = 0; i < files.length; ++i)
    {
        var path = files[i];// the file name has .amit appended, so I need to remove it
        var writablePath = path.replace('.amit', "");
        //console.log(writablePath);
        //console.log(files[i]);
        decryptTheFile(ivBuf, files[i], writablePath);
    }

});

function decryptTheFile(iv, filePath, writablePath)
{

    // input file
    var r = fs.createReadStream(filePath);
    // zip content
    var zip = zlib.createGzip();
    // encrypt content
    var encrypt = crypto.createCipheriv(algorithm, password, iv);
    // decrypt content
    var decrypt = crypto.createDecipheriv(algorithm, password, iv);
    // unzip content
    var unzip = zlib.createGunzip();
    // write file
    var w = fs.createWriteStream(writablePath);

    // start pipe
    r.pipe(decrypt).pipe(unzip).pipe(w);

}

function get32Bytes(text)
{
    while (text.length <= 32)
        text += text;
    return text.substr(0,32);
}

