/* eslint-disable consistent-return */
/* eslint-disable eol-last */
const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/html/frontpage.html`);
});

const port = process.env.PORT || 8080;

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port:", Number(port));
});