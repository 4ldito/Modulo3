let http = require("http");
let fs = require("fs");

const beatles = require("./data");


const replaceStrings = (str, data) => {
  data.forEach(replace => {
    str.replace(`/\${${replace}}`)
  });
}

http
  .createServer((req, res) => {
    const data = req.url.split("/")[2] || req.url.split("/")[1];
    let searchedBeatleIndex = -1;
    if (data)
      searchedBeatleIndex = beatles.members.findIndex(
        (b) => b.name === data.replace("%20", " ")
      );

    switch (req.url) {
      case "/":
        res.writeHead(200, { "Content-Type": "text/html" });
        const html = fs.readFileSync("./index.html", "utf-8");
        res.end(html);
        break;
      // case pagina personal del beatle 
      case (searchedBeatleIndex >= 0) ? `/${beatles.members[searchedBeatleIndex].name.replace(" ", "%20")}` : undefined:
        res.writeHead(200, { "Content-Type": "text/html" });
        const actualBeatle = beatles.members[searchedBeatleIndex];
        const htmlBeatle = fs.readFileSync("./beatle.html", "utf-8")
          .replace(/\${name}/g, actualBeatle.name)
          .replace(/\${dateBirth}/g, actualBeatle.birthdate)
          .replace(/\${sourceImg}/g, actualBeatle.profilePic);
        res.end(htmlBeatle);
        break;
      case "/api":
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(beatles));
        break;
      case (searchedBeatleIndex >= 0) ? `/api/${beatles.members[searchedBeatleIndex].name.replace(" ", "%20")}` : undefined:
        res.writeHead(200, { "Content-Type": "application/json" });

        res.end(JSON.stringify(beatles.members[searchedBeatleIndex]));
        break;
      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Page Don't Found");
        break;
    }
  })
  .listen(1337, "127.0.0.1");
