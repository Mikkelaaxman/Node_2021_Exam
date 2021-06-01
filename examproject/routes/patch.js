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
        console.log("EDIT WITH ID " + req.body._id)
        const db = client.db(dbName);
        const wine = db.collection("wine");
        var myquery = { "_id": new ObjectId(req.body._id) };
        var newvalues = {
            $set: {
                type: req.body.type,
                year: req.body.year,
                name: req.body.name,
                country: req.body.country,
                price: req.body.price,
                imageURL: req.body.imageURL,
            }
        };
        
        console.log("WINE UPDATED NAME: " + req.body.name)
        try {
            wine.updateOne(myquery, newvalues);
        } catch (error) {
            console.error(error)
        }
        setTimeout(
            () => {
                client.close()
                res.redirect("/")
            },
            2 * 1000
        );
        
        
    });
});

module.exports = {
    router
};