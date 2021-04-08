//create the client class
const { MongoClient } = require("mongodb")
    //const MongoClient = require("mongodb").MongoClient

const uri = "mongodb://localhost:27017"
connect();
async function connect() {
    const client = new MongoClient(uri);
    try {
        await client.connect({ useNewUrlParser: true });
        const db = client.db("wine");
        console.log(`Connected to database ${db.databaseName}`)

    } catch (ex) {
        console.error(`Something bad happend ${ex}`)
    } finally {
        client.close();
    }

}