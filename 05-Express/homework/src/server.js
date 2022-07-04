// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;
const STATUS_OK = 200;
const STATUS_DONT_FOUND = 404;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests


server.post('/posts', (req, res) => {
    const { author, contents, title } = req.body;
    if (!author || !contents || !title) {
        res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" });
    } else {
        const newPost = { author, contents, title, id: id++ };
        posts.push(newPost);
        res.status(STATUS_OK).json(newPost);
    }
});

server.post('/posts/author/:author', (req, res) => {
    const { contents, title } = req.body;
    const author = req.params.author;
    if (!author || !contents || !title) {
        res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" });
    } else {
        const newPost = { author, contents, title, id: id++ };
        posts.push(newPost);
        res.status(STATUS_OK).json(newPost);
    }
});

server.get("/posts", (req, res) => {
    const { term } = req.query;

    if (term) {
        const newPosts = posts.filter(p => p.title.includes(term) || p.contents.includes(term));
        res.status(STATUS_OK).json(newPosts);
    } else {
        res.status(STATUS_OK).json(posts);
    }

});

server.get('/posts/:author', (req, res) => {
    const { author } = req.params;
    const authorPosts = posts.filter(p => p.author === author);

    if (authorPosts.length > 0) res.status(STATUS_OK).json(authorPosts);
    else res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post del autor indicado" });
});

server.get('/posts/:author/:title', (req, res) => {
    const { author, title } = req.params;
    const authorPosts = posts.filter(p => (p.author === author) && (p.title === title));

    if (authorPosts.length > 0) res.status(STATUS_OK).json(authorPosts);
    else res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post con dicho titulo y autor indicado" });
});


server.put('/posts', (req, res) => {
    const { id, title, contents } = req.body;
    const msgError = { error: "No se recibieron los parámetros necesarios para modificar el Post" };

    if (!id || !title || !contents) return res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para modificar el Post" });

    const indexPost = posts.findIndex(p => p.id === id);

    if (indexPost >= 0) {
        posts[indexPost] = { ...posts[indexPost], title, contents }
        res.status(STATUS_OK).json(posts[indexPost]);
    } else {
        res.status(STATUS_USER_ERROR).json({ error: `El id (${id}) recibido no es correcto` });
    }

});

server.delete('/posts', (req, res) => {
    const { id } = req.body;
    if (!id) res.status(STATUS_USER_ERROR).json({ error: `El id (${id}) recibido no es correcto` });
    const indexPost = posts.findIndex(p => p.id === id);

    if (indexPost >= 0) {
        posts = posts.filter(p => p.id !== id);
        res.status(STATUS_OK).json({ success: true });
    } else {
        res.status(STATUS_USER_ERROR).json({ error: `El id (${id}) no corresponde a un post existente` });
    }
});

server.delete('/author', (req, res) => {
    const { author } = req.body;
    const authorPost = posts.filter(p => p.author === author);

    if (authorPost.length > 0) res.status(STATUS_OK).json(authorPost);
    else res.status(STATUS_USER_ERROR).json({ error: `No existe el autor indicado` });


});


module.exports = { posts, server };
