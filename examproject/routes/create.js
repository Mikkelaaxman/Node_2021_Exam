const MongoClient = require("mongodb").MongoClient;

const { urlencoded } = require("body-parser");
const router = require("express").Router();

const url = "mongodb://localhost:27017";
const dbName = "beverages";


MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        throw new Error(error);
    }

    const db = client.db(dbName);
    const wine = db.collection("wine");


    let insert = {
        type: req.body.type,
        year: req.body.year,
        name: req.body.name,
        country: req.body.country
    }

    wine.insertOne({ insert }, (error, result) => {
        if (error) {
            throw new Error(error);
        }

        console.log(result);
        client.close();
    });
});


router.post("/api/createWine", (req, res) => {
    console.log(req.body.email)
});

module.exports = {
    router
};