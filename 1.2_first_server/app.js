const express = require("express");

const app = express();

const date = new Date();

const dateList = [
  "Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Satuday",
];

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

app.get("/time", (req, res) => {
  const time = date.getTime();
  const realDate = new Date(time);
  res.send({ time: realDate.toString() });
});

app.get("/day", (req, res) => {
  res.send({ day: dateList[date.getDay()] });
});

app.get("/month", (req, res) => {
  res.send({ month: monthNames[date.getMonth()] });
});

app.get("/about", (req, res) => {
  res.send({ version: "1.0.0 " });
});

app.get("/page", (req, res) => {
  res.send("<h1>Welcome<h1>");
});

app.listen(8080);
