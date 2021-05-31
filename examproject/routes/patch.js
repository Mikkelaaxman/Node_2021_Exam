const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectID;

const url = "mongodb://localhost:27017";
const dbName = "beverages"


router.patch("/api/edit", (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }

        const db = client.db(dbName);
        const wine = db.collection("wine");
        var myquery = { "_id": new ObjectId(req.params._id) };
        var newvalues = {
            $set: {

                //Is it body or params? do we need bodyparser? 
                type: req.params.type,
                year: req.params.year,
                name: req.params.name,
                country: req.params.country,
                price: req.params.price,
                

            }
        };

        wine.updateOne(myquery, newvalues);
        client.close();
    });
});

module.exports = {
    router
};