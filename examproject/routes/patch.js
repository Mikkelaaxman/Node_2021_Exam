const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "beverages"


app.patch("/wine/:name", function(req, res) {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }

        const db = client.db(dbName);
        const wine = db.collection("wine");
        var myquery = { name: "whitecliff" };
        var newvalues = {
            $set: {
                type: "red",
                year: 2020,
                name: qs2,
                country: "astralia"
            }
        };

        wine.updateOne(myquery, newvalues);
        client.close();
    });
});

module.exports = {
    router
};