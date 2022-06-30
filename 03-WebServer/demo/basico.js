let http = require("http"); // importamos el módulo http para poder trabajar con el protocolo

http
  .createServer((req, res) => {
    // Creamos una serie de events listener, que van a escuchar por requests que ocurren en este socket
    //Para crear un response empezamos escribiendo el header
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" }); //Le ponemos el status code y algunos pair-values en el header
      res.end("<h1>Hola mundo!</h1>");
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("dont found");
    }
  })
  .listen(1337, "127.0.0.1"); //Por último tenemos que especificar en que puerto y en qué dirección va a estar escuchando nuestro servidor
