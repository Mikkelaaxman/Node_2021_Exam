const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "beverages"

router.post("/api/create_wine", (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw new Error(error);
        }

        const db = client.db(dbName);
        const wine = db.collection("wine");


        wine.insertOne({
            type: req.body.type,
            year: req.body.year,
            name: req.body.name,
            country: req.body.country,
            price: req.body.price,
            url: req.body.url

        }, (error, result) => {
            if (error) {
                throw new Error(error);
            }

            console.log(result);
            client.close();
        });
        res.redirect("/")
    });
});

module.exports = {
    router
};