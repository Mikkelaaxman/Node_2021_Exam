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
  res.send(realDate.toString());
});

app.get("/day", (req, res) => {
  res.send(dateList[date.getDay()]);
});

app.get("/month", (req, res) => {
  res.send(monthNames[date.getMonth()]);
});

app.listen(8080);
