const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectID;

const url = "mongodb://localhost:27017";
const dbName = "beverages"


router.post("/api/edit", (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }
        console.log("EDIT WITH ID "+req.body._id)
        const db = client.db(dbName);
        const wine = db.collection("wine");
        var myquery = { "_id": new ObjectId(req.body._id) };
        var newvalues = {
            $set: {

                //Is it body or params? do we need bodyparser? 
                type: req.body.type,
                year: req.body.year,
                name: req.body.name,
                country: req.body.country,
                price: req.body.price,
                

            }
        };
        console.log("WINE UPDATED NAME: "+req.body.name)
        wine.updateOne(myquery, newvalues);
        client.close();
        res.redirect("/")
    });
});

module.exports = {
    router
};