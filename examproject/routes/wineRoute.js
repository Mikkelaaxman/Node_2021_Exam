const router = require("express").Router();
const db = require("../db")
const ObjectId = require('mongodb').ObjectID;

const dbName = "beverages"
const collection = "wine"

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
router.post("/api/wine/", (req, res, next) => {

    const wine = db.get(dbName).collection(collection);

/*     console.log( req.fields.type,req.fields.year,req.fields.name,
               req.fields.country,
                   req.fields.price,
                   req.fields.url);

    ;        
    if(req.fields.price instanceof String){
        console.log("Price is a string")
    }
 */

    wine.insertOne({

        type: req.fields.type,
        year: Number(req.fields.year),
        name: req.fields.name,
        country: req.fields.country,
        price: Number(req.fields.price),
        imageURL: req.fields.url
    
    }
/*     Promise.resolve().then(function () {
        throw new Error('BROKEN')
    }).catch(next) // Errors will be passed to Express. */
    , function (err, results) {
        if (err) {
            res.send(err)
            throw new Error(err)
        } else {
            console.log("sending results now" + results)
            res.send(results);
        }
    });

});


module.exports = {
    router
};