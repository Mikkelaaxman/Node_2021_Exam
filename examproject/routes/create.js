const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "beverages";


MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        throw new Error(error);
    }

    const db = client.db(dbName);
    const wine = db.collection("wine");

    wine.insertOne({ name: "Gary Oldman" }, (error, result) => {
        if (error) {
            throw new Error(error);
        }

        console.log(result);
        client.close();
    });
});