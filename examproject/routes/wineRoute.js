const router = require("express").Router();
const db = require("../db")
const ObjectId = require('mongodb').ObjectID;

const dbName = process.env.DB;
const collection = process.env.COLLECTION;

//CREATE WINE 
router.post("/api/wine/", (req, res) => {

    const wine = db.get(dbName).collection(collection);

    wine.insertOne({

        type: req.fields.type,
        year: Number(req.fields.year),
        name: req.fields.name,
        country: req.fields.country,
        price: Number(req.fields.price),
        imageURL: req.fields.url,
        likes: 0,
        date: new Date()

    }
        /*     Promise.resolve().then(function () {
                throw new Error('BROKEN')
            }).catch(next) // Errors will be passed to Express. */
        , function (err, results) {
            if (err) {
                res.send(err)
                throw new Error(err)
            } else {
                res.redirect("/")
            }
        });

});

//Read Single
router.get("/api/wine/:_id", (req, res) => {

    const wine = db.get(dbName).collection(collection);

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
        res.send({ foundWines })
    });
});


//Edit wine
router.patch("/api/wine", (req, res) => {

    const wine = db.get(dbName).collection(collection);

    let myquery = { "_id": new ObjectId(req.fields._id) };
    let newvalues = {
        $set: {
            type: req.fields.type,
            year: req.fields.year,
            name: req.fields.name,
            country: req.fields.country,
            price: req.fields.price,
            imageURL: req.fields.imageURL,
        }
    };
    try {
        wine.updateOne(myquery, newvalues);

        res.send("success");
    } catch (error) {
        console.error(error)
        res.status(error.Number).send(error);
    }
    /*         setTimeout(
                () => {
                    client.close()
                    res.redirect("/")
                },
                2000    //wait 2 sec
            ); */


});

//Like wine
router.patch("/api/likeWine", (req, res) => {

    const wine = db.get(dbName).collection(collection);
    let myquery = { "_id": new ObjectId(req.fields._id) };

    let newvalues = {
        $inc: { "likes": 1 }    //Increment likes by one 
    };
    try {

        wine.updateOne(myquery, newvalues);
        res.send("success");
    } catch (error) {
        console.error(error)
        res.status(error.Number).send(error);
    }

});

//DELETE WINE
router.delete("/api/wine/:id", (req, res) => {

    const wine = db.get(dbName).collection(collection);
    let id = req.params.id;

    wine.deleteOne({ _id: new ObjectId(id) }, function (err, results) {
        if (err) {
            throw new Error(err)
        }else{res.redirect("/all")}
    });
});


module.exports = {
    router
};