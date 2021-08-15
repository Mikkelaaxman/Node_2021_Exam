const express = require("express");
const app = express();

const formidableMiddleware = require('express-formidable');
const escapeHtml = require("html-escaper").escape;

if(process.env.NODE_ENV){
require("dotenv").config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`,
});
}

app.use(formidableMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


const db = require("./db")
const server = require("http").createServer(app);
const io = require("socket.io")(server);

//Router
const wineRoute = require("./routes/wineRoute");
const utilRoute = require("./routes/utilRoute");
app.use(wineRoute.router);
app.use(utilRoute.router);

//Cross Browser funtionality
/* app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); */

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/create", (req, res) => {
    res.sendFile(`${__dirname}/public/create_wine/create_wine.html`);

});

app.get("/all", (req, res) => {
    res.sendFile(`${__dirname}/public/list_wines/wines.html`);
});

app.get("/edit/:id", (req, res) => {
    res.sendFile(`${__dirname}/public/edit_wine/edit_wine.html`);
});

io.on("connection", (socket) => {
    console.log("A socket connected with id", socket.id);

    //Likes
    socket.on("wineLiked", (data) => {
        //To all sockets
        io.emit("likeThisWine", {
            wine: data.wine,
            index: escapeHtml(data.index)
        });
        //To creator socket. This calls DB. 
        socket.emit("likeThisWineDB", {
            wine: data.wine,
            index: escapeHtml(data.index)
        });
        console.log(data.wine.likes)
    });

    //disconnect
    socket.on("disconnect", () => {
        console.log("A socket disconnect");
    });
});

const port = process.env.PORT || 8080;
const url = process.env.HOST;

console.log("PORT"+process.env.PORT)
console.log("HOST " + process.env.HOST)

// Connect to Mongo once on start
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
});


//Country json file reader
/* const fs = require("fs");

exports.countries = function(){
    fs.readFile("./public/resources/countries.json", 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        } try {
            const list = JSON.parse(jsonString);
            console.log('File data:', list);
            return list;
        } catch (err) {
            console.error(err);
        }

    })
} */
