const express = require("express");

const app = express();

const animeNames = [
  {
    id: 1,
    title: "Attack on titan",
    weirdness: 6.8,
  },
  {
    id: 2,
    title: "One Punch man",
    protagonist: "Saitama",
  },
];

app.get("/", (req, res) => {
  res.send({});
});

app.get("/anime", (req, res) => {
  res.send({ data: animeNames });
});

app.get("/anime/:id", (req, res) => {
  const animeNamesId = Number(req.params.id);
  const foundAnime = animeNames.find((animeName) => animeName.id === animeNamesId);
  res.send({ data: foundAnime });
});

app.listen(8080, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Server is running on port:", 8080);
});
