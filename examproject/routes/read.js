const MongoClient = require("mongodb").MongoClient;

const { urlencoded } = require("body-parser");
const router = require("express").Router();

const url = "mongodb://localhost:27017";
const dbName = "beverages";

router.post("/api/read", (req, res) => {
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
            console.log(data);
            client.close();
            res.send({ data: foundWines })
        });
    });
});

router.get('/database/get', (req, res) => {
    res.sendFile(`${__dirname}/public/see_wines.html`);
});

module.exports = {
    router
};