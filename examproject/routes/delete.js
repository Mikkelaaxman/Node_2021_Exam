const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "beverages"


router.delete("/wine/:id", (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }

        const db = client.db(dbName);
        const wine = db.collection("wine");
        let id = req.params.id;

        wine.deleteOne({ _id: new MongoClient.ObjectId(id) }, function(err, results) {
            if (err) {
                throw new Error(err)
            }
            client.close();
        });
        //wine.deleteOne({ _id: req.params.id })
        res.redirect("/")

    });
});

module.exports = {
    router
};