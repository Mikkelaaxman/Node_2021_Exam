const MongoClient = require("mongodb").MongoClient;

const { urlencoded } = require("body-parser");
const router = require("express").Router();

const url = "mongodb://localhost:27017";
const dbName = "beverages";

MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        throw error;
    }

    const db = client.db(dbName);
    const wine = db.collection("wine");

    wine.find({ type: "white" }).toArray((error, data) => {
        console.log(data);
        client.close();
    });
});

router.post("/api/read", (req, res) => {
    console.log(req.body.email)
});

module.exports = {
    router
};