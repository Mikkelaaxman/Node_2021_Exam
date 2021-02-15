const express = require("express");
const app = express();


let cars = [
    {type: "Volvo", topSpeed: 185, color: "Black", id: 0},
    {type: "BMW", topSpeed: 205, color: "Blue", id: 1},
    {type: "Tesla", topSpeed: 200, color: "Red", id: 2},
    {type: "Fiat", topSpeed: 165, color: "White", id: 3}
]

app.get("/cars", (req, res) => {
    res.send(cars)
});

app.get("/cars/:id", (req, res) => {
    const car = cars.find(car => car.id === Number(req.params.id));
    return res.send(car);
});

app.listen(8080);

