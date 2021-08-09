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
router.post("/api/wine", (req, res) => {

    const wine = db.get(dbName).collection(collection);
        
    console.log(req.body);
    console.log(req.headers);
    console.log(req.ip);
    console.log(req.body.type);

        wine.insertOne({
            
            type: req.body.type,
            year: req.body.year,
            name: req.body.name,
            country: req.body.country,
            price: req.body.price,
            imageURL: req.body.url
            //likes : 0
        }, function(err, results){
            if(err){
                console.log(req.body);
                throw new Error(err)
            } else {
                console.log(req.body);
                res.send("success")
            }
        })

});


module.exports = {
    router
};