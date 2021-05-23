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

    wine.updateOne({ type: "white" }, { type: "red" }), ((error, data) => {
        if (error) {
            throw new Error(error);
        }
        console.log(data);
        client.close();
    });
});