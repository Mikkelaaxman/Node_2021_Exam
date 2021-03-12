const express = require("express");

const app = express();

app.use(express.json());

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

let AUTOINCREMENT = animeNames.length;

app.post("/anime_names", (req, res) => {
  const newAnimeName = req.body;
  newAnimeName.id = ++AUTOINCREMENT;
  animeNames.push(newAnimeName);
  res.send({data: newAnimeName});
});

app.delete("/anime_names/:id", (req, res) => {
  animeNames = animeNames.filter(animeName => animeName.id !== Number(req.params.id));
  res.send({})
});

app.patch("anime_names/:id", (req, res) => {
  animeNames = animeNames.map(animeName => {
    if (animeName.id === Number(req.params.id)) {
      return {...req.body, ...animeName, id: animeName.id};
    }
    return animeName
  });
  res.send({data: wasUpdated});
});

app.listen(8080, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Server is running on port:", 8080);
});
