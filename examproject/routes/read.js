const MongoClient = require("mongodb").MongoClient;

const { urlencoded } = require("body-parser");
const router = require("express").Router();

const url = "mongodb://localhost:27017";
const dbName = "beverages";

router.get("/api/getwine", (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }

        const db = client.db(dbName);
        const wine = db.collection("wine");

        wine.find().toArray((error, foundWines) => {
            if (error) {
                throw error;
            }
            console.log(foundWines);
            client.close();
            res.send({ foundWines })
        });
    });
});

module.exports = {
    router
};