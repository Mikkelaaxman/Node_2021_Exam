const { MongoClient } = require("mongodb");
// Connection URI

const uri = "mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        await client.db("exam");
        console.log("Connected successfully to server");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}



run().catch(console.dir);