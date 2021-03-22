const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/welcome.html`);
});

app.get("/pizza", (req, res) => {
  res.sendFile(`${__dirname}/public/pizza.html`);
});

app.get("/whiskey", (req, res) => {
  res.send({ barkeep: "here ya go" });
});

app.get("/bar", (req, res) => {
  if (Number(req.query.money) > 500) {
    res.redirect("/whiskey");
  } else {
    res.send({ doorman: "no money pal" });
  }
});

app.get("/candle", (req, res) => {
  if (req.query.blow) {
    res.send({ lightsOn: false });
  } else {
    res.send({ lightsOn: true });
  }
});

const port = process.env.port || 8080;

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Server is running on port:", Number(port));
});
