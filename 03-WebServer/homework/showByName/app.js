var fs = require("fs")
var http = require("http")

// Escribí acá tu servidor

const urls = ['arcoiris_doge.jpg',
    'badboy_doge.jpg',
    'code_doge.jpg',
    'resaca_doge.jpg',
    'retrato_doge.jpg',
    'sexy_doge.jpg'
];

http.createServer((req, res) => {
    const imgUrl = req.url.split('/')[1];
    const foundedImg = urls.find((img) => img === imgUrl);

    if (foundedImg) {

        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        let img = fs.readFileSync(__dirname + `/images/${foundedImg}`);
        res.end(img);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Imagen no encontrada =(');
    }

}).listen(1337, '127.0.0.1');