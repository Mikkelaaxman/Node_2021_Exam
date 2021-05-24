const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

const url = "mongodb://localhost:27017";
const dbName = "beverages"

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/create", (req, res) => {
    res.sendFile(`${__dirname}/public/create_wine.html`);
});

app.get("/view", (req, res) => {
    res.sendFile(`${__dirname}/public/my_wines.html`);
});

app.get("/all", (req, res) => {
    res.sendFile(`${__dirname}/public/see_wine.html`);
});

app.get("/api/see_wine", (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }

        const db = client.db(dbName);
        const wine = db.collection("wine");

        wine.find().toArray((error, foundWines) => {
            if (error) {
                throw error;
            }
            console.log(foundWines);
            client.close();
            res.send({ foundWines })
        });
    });
});


app.post("/api/create_wine", (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw new Error(error);
        }

        const db = client.db(dbName);
        const wine = db.collection("wine");


        let insert = {
            type: req.body.type,
            year: req.body.year,
            name: req.body.name,
            country: req.body.country
        }

        wine.insertOne({ wine: insert }, (error, result) => {
            if (error) {
                throw new Error(error);
            }

            console.log(result);
            client.close();
        });
        res.redirect("/")
    });
});


app.patch("/wine/:id", function(req, res) {
    let updateObject = req.body; // {last_name : "smith", age: 44}
    let id = req.params.id;
    db.users.update({ _id: ObjectId(id) }, { $set: updateObject });
});

app.delete("/wine/:id", (req, res) => {
    db.collection('items').remove({ _id: mongodb.ObjectID(req.params.id) }, (err, result) => {
        if (err) return console.log(err)
        console.log(req.body)
        res.redirect('/')
    })
})


const port = process.env.PORT || 8080;

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port:", Number(port));
});