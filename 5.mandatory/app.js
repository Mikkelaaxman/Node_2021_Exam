const express = require("express");

const app = express();

app.use(express.static("public"));

// eslint-disable-next-line no-unused-vars
app.get("/index", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/node", (req, res) => {
    res.sendFile(`${__dirname}/public/node.html`);
});

app.get("/express", (req, res) => {
    res.sendFile(`${__dirname}/public/express.html`);
});

app.get("/environment", (req, res) => {
    res.sendFile(`${__dirname}/public/environment.html`);
});

app.get("/basic", (req, res) => {
    res.sendFile(`${__dirname}/public/basic.html`);
});

const port = process.env.PORT || 8080;

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port:", Number(port));
});