const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = ("body-parser")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const readRouter = require("./routes/read.js");
const postRouter = require("./routes/post.js");
const patchRouter = require("./routes/patch");
const deleteRouter = require("./routes/delete.js");


app.use(readRouter.router);
app.use(postRouter.router);
app.use(deleteRouter.router);
app.use(patchRouter.router);



const url = "mongodb://localhost:27017";
const dbName = "beverages"

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/create", (req, res) => {
    res.sendFile(`${__dirname}/public/create_wine.html`);
});

app.get("/view", (req, res) => {
    res.sendFile(`${__dirname}/public/wines.html`);
});

app.get("/all", (req, res) => {
    res.sendFile(`${__dirname}/public/wine.html`);
});

app.get("/socket", (req, res) => {
    res.sendFile(`${__dirname}/public/sockettest.html`);
});

const port = process.env.PORT || 8080;

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port:", Number(port));
});