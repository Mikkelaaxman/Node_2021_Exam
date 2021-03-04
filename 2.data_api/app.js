const express = require("express");

const wine = require("./wine.json");

const app = express();

app.get("/", (req, res) => {
  res.send({});
});

app.get("/wine", (req, res) => {
  res.send({ wines: wine });
});

app.get("/search", (req, res) => {
  res.send({ query: req.query });
});

app.get("/telegram/:message", (req, res) => {
  res.send({ message: req.params.message });
});

app.post("/thebody", (req, res) => {
  console.log(req.body);
  res.send({ body: req.body });
});

app.delete("/thebody", (req, res) => {
  console.log(req.body);
  res.send({ body: req.body });
});

app.patch("/thebody", (req, res) => {
  console.log(req.body);
  res.send({ body: req.body });
});

app.listen(8080, (error) => {
  if (error) {
    console.log(typeof error);
  }
  console.log("Server is running on port:", 8080);
});
