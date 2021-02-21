const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send({});
});

app.get("/me", (req, res) => {
  res.send({
    age: 23,
    Name: "Victor",
  });
});

app.listen(8080);
