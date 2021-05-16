const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "beverages";

MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        throw error;
    }

    const db = client.db(dbName);
    const wine = db.collection("wine");

    wine.find({ type: "red" }).toArray((error, data) => {
        console.log(data);
        client.close();
    });
});