const express = require("express");
const app = express();


const formidableMiddleware = require('express-formidable');

const methodOverride = require('method-override');
const escapeHtml = require("html-escaper").escape;

app.use(formidableMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//app.use(methodOverride('_method')); //We need this to change html form method to work with PATCH

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

/* app.get("/view", (req, res) => {
    res.sendFile(`${__dirname}/public/wine.html`);
}); */

app.get("/all", (req, res) => {
    res.sendFile(`${__dirname}/public/list_wines/wines.html`);
});

app.get("/edit/:id", (req, res) => {
    res.sendFile(`${__dirname}/public/edit_wine/edit_wine.html`);
});
/* const dbName = "beverages"
const collection = "wine"
//CREATE WINE 
app.post("/api/wine", express.json(), (req, res) => {

    const wine = db.get(dbName).collection(collection);
    console.log(req.fields.body);

    console.log(req.body.body);
    console.log(req.headers);
    console.log(req.ip);

    wine.insertOne({

        type: req.body.type,
        year: req.body.year,
        name: req.body.name,
        country: req.body.country,
        price: req.body.price,
        imageURL: req.body.url
        //likes : 0
    }, function (err, results) {
        if (err) {
            console.log(req.body);
            throw new Error(err)
        } else {
            console.log(req.body);
            res.send("success")
        }
    })

});
 */

io.on("connection", (socket) => {
    // console.log("A socket connected with id", socket.id);
    socket.on("thisWineLiked", (data) => {
        io.emit("likeThisWine", { _id: escapeHtml(data._id) })
    });

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
