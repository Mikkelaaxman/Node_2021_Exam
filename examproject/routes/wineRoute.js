const router = require("express").Router();

const ObjectId = require('mongodb').ObjectID;

const dbName = "beverages"
const collection = "wine"
const db = require("../db")

/* async function localClient(callback) {

    try {
        await MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {

            const db = client.db(dbName);


        });

        await listdbs(client);
        await deleteByID(db);

        await deleteByID(client)
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
} */

//read Single
router.get("/api/wine/:_id", (req, res) => {

    const wine = db.get(dbName).collection(collection);

    // console.log(req.params._id)

    wine.find({ "_id": new ObjectId(req.params._id) }).toArray((error, foundWines) => {
        if (error) {
            throw error;
        }
        res.send({ foundWines })
    });
});


//Read All 
router.get("/api/wine", (req, res) => {

    const wine = db.get(dbName).collection(collection);

    wine.find().toArray((error, foundWines) => {
        if (error) {
            throw error;
        }
        console.log(foundWines);
        res.send({ foundWines })
    });
});


//Edit wine
router.patch("/api/wine", (req, res) => {

    console.log("EDIT WITH ID " + req.body._id)
    //const db = client.db(dbName);
    const wine = db.get(dbName).collection(collection);
    let myquery = { "_id": new ObjectId(req.body._id) };
    let newvalues = {
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
    /*         setTimeout(
                () => {
                    client.close()
                    res.redirect("/")
                },
                2000    //wait 2 sec
            ); */


});

//DELETE WINE
router.delete("/api/wine/:id", (req, res) => {

    const wine = db.get(dbName).collection(collection);
    let id = req.params.id;

    wine.deleteOne({ _id: new ObjectId(id) }, function (err, results) {
        if (err) {
            throw new Error(err)
        }
    });
});

//CREATE WINE 
router.post("/api/wine", (req, res) => {

    const wine = db.get(dbName).collection(collection);

    wine.insertOne({
        type: req.body.type,
        year: Number(req.body.year),
        name: req.body.name,
        country: req.body.country,
        price: Number(req.body.price),
        imageURL: req.body.url

    }

    );
});


module.exports = {
    router
};