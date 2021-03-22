const express = require("express");

const app = express();

app.use(express.static(__dirname + '/public'));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/crud", (req, res) => {
    res.sendFile(__dirname + "/public/crud.html");
});

app.get("/express", (req, res) => {
    res.sendFile(__dirname + "/public/express.html");
});
app.get("/enviroment", (req, res) => {
    res.sendFile(__dirname + "/public/inviroment.html");
});

const port = process.env.PORT || 8080;

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port:", Number(port));
});