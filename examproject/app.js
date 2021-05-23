const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/my_wines", (req, res) => {
    res.sendFile(`${__dirname}/public/my_wines.html`);
});

app.get("/see_wine", (req, res) => {
    res.sendFile(`${__dirname}/public/see_wine.html`);
});

const port = process.env.PORT || 8080;

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port:", Number(port));
});