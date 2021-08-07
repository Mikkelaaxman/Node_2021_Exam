const express = require("express");
const db = require("./db")
const bodyParser = ("body-parser")
const methodOverride = require('method-override');

const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server);

const escapeHtml = require("html-escaper").escape;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride('_method')); //We need this to change html form method to work with PATCH

//Router
const wineRoute = require("./routes/wineRoute")
/* 
const readRouter = require("./routes/read.js");
const postRouter = require("./routes/post.js");
const patchRouter = require("./routes/patch.js");
const deleteRouter = require("./routes/delete.js");
const singleRouter = require("./routes/readSingle.js");
 */

app.use(wineRoute.router)

/* app.use(readRouter.router);
app.use(postRouter.router);
app.use(deleteRouter.router);
app.use(patchRouter.router);
app.use(singleRouter.router);
 */
/* const url = "mongodb://localhost:27017";
const dbName = "beverages" */

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/create", (req, res) => {
    res.sendFile(`${__dirname}/public/create_wine/create_wine.html`);
});

/* app.get("/view", (req, res) => {
    res.sendFile(`${__dirname}/public/wine.html`);
}); */

app.get("/all", (req, res) => {
    res.sendFile(`${__dirname}/public/list_wines/wines.html`);
});

app.get("/edit/:id", (req, res) => {
    res.sendFile(`${__dirname}/public/edit_wine/edit_wine.html`);
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
const url = "mongodb://localhost:27017";

// Connect to Mongo on start
db.connect(url, function (err) {
    if (err) {
        console.log('Unable to connect to Mongo.')
        process.exit(1)
    } else {
        server.listen(port, (error) => {
            if (error) {
                console.log(error);
            }
            console.log("Server is running on port:", Number(port));
        });
    }
})



