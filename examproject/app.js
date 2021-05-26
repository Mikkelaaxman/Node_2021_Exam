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


        wine.insertOne({
            type: req.body.type,
            year: req.body.year,
            name: req.body.name,
            country: req.body.country
        }, (error, result) => {
            if (error) {
                throw new Error(error);
            }

            console.log(result);
            client.close();
        });
        res.redirect("/")
    });
});


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

app.delete("/wine/:id", (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }

        const db = client.db(dbName);
        const wine = db.collection("wine");
        let id = req.params.id;

        wine.deleteOne({ _id: new MongoClient.ObjectId(id) }, function(err, results) {});
        //wine.deleteOne({ _id: req.params.id })

        res.json({ success: id })
        client.close();




    });
});

const port = process.env.PORT || 8080;

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port:", Number(port));
});