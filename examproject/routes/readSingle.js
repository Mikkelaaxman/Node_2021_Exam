const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017";
const dbName = "beverages"

router.get("/api/see_wine/:_id", (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }

        const db = client.db(dbName);
        const wine = db.collection("wine");

        console.log(req.params._id)

        wine.find({ "_id": new ObjectId(req.params._id)}).toArray((error, foundWines) => {
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