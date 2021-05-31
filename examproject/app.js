const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = ("body-parser")
const app = express();


const server = require("http").createServer(app);

const io = require("socket.io")(server);

const escapeHtml = require("html-escaper").escape;



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

var counter = 0; //Initial counter value 

const url = "mongodb://localhost:27017";
const dbName = "beverages"

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/create", (req, res) => {
    res.sendFile(`${__dirname}/public/create_wine.html`);
});

app.get("/view", (req, res) => {
    res.sendFile(`${__dirname}/public/wine.html`);
});

app.get("/all", (req, res) => {
    res.sendFile(`${__dirname}/public/wines.html`);
});

app.get("/edit", (req, res) => {
    res.sendFile(`${__dirname}/public/edit.html`);
});



io.on("connection", (socket) => {
    // console.log("A socket connected with id", socket.id);

    socket.on("colorChanged", (data) => {
        // changes the color for ALL the sockets in the io namespace
        io.emit("changeBackgroundToThisColor", { color: escapeHtml(data.color) });

        // changes the color ONLY for the socket that made the change
        // socket.emit("changeBackgroundToThisColor", data);

        // changes the color for ALL the sockets EXCEPT itself
        // socket.broadcast.emit("changeBackgroundToThisColor", data);
    });

    socket.on("disconnect", () => {
        console.log("A socket disconnect");
    });

});



const port = process.env.PORT || 8080;

server.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port:", Number(port));
});