let http = require("http");
let fs = require("fs");
const beatles = require("./data");

const returnUrlBeatle = (index, api = false) => {
  if (index < 0) return undefined;
  // 'api' va a almacenar si la URL comienza con api o sin.
  if (api) return `/api/${encodeURI(beatles.members[index].name)}`
  else return `/${encodeURI(beatles.members[index].name)}`;
}

http
  .createServer((req, res) => {
    const data = req.url.split("/")[2] || req.url.split("/")[1]; // conseguir el nombre del beatle en el URL. si no tiene 2 de length, deducimos que el nombre del beatle estará en el indice 1.
    let searchedBeatleIndex = -1;
    if (data) searchedBeatleIndex = beatles.members.findIndex(b => b.name === decodeURI(data)); // decodeURI transforama los "%20" y demás caracteres URI por espacios.

    switch (req.url) {
      //página principal
      case "/":
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync("./index.html", "utf-8");
        res.end(html);
        break;
      // case pagina personal del beatle en especifico
      case returnUrlBeatle(searchedBeatleIndex):
        res.writeHead(200, { "Content-Type": "text/html" });
        const actualBeatle = beatles.members[searchedBeatleIndex];
        // Consigue el HTML y reemplaza las palabras que esten encerradas por ${prueba} por su respectivo valor correcto. 
        const htmlBeatle = fs.readFileSync("./beatle.html", "utf-8")
          .replace(/\${name}/g, actualBeatle.name)
          .replace(/\${dateBirth}/g, actualBeatle.birthdate)
          .replace(/\${sourceImg}/g, actualBeatle.profilePic);
        res.end(htmlBeatle);
        break;
      // JSON de todos los beatles
      case "/api":
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(beatles));
        break;
      // case JSON de un beatle en especifico
      case returnUrlBeatle(searchedBeatleIndex, true):
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(beatles.members[searchedBeatleIndex]));
        break;
      // 404
      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Page Don't Found");
        break;
    }
  })
  .listen(1337, "127.0.0.1");
