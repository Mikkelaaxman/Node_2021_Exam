/* eslint-disable consistent-return */
/* eslint-disable eol-last */
const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/welcome/welcome.html`);
});

app.get("/pizza", (req, res) => {
    res.sendFile(`${__dirname}/public/pizzaparlor.html`);
});

app.get("/whiskey", (req, res) => {
    res.send({ barkeep: "Here ya go, pal. A whiskey for you." });
});

app.get("/pub", (req, res) => {
    if (Number(req.query.money) > 500) {
        res.redirect("/whiskey");
    } else {
        res.send({ doorman: "Sorry, you don't have money for whiskey." });
    }
});

app.get("/candle", (req, res) => {
    if (req.query.blow) {
        return res.send({ lightsOn: false });
    }

    res.send({ lightsOn: true });
});

app.get("/catfacts", (req, res) => {
    res.sendFile(`${__dirname}/public/catfacts/catfacts.html`);
});

const port = process.env.PORT || 8080;

const server = app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }

    console.log("Server is running on port", server.address().port);
});