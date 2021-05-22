const router = require("express").Router();
const assert = require("assert");
const Mongo = require("mongodb");

const url = "mongodb://localhost:27017";



router.get("/getdata", (req, res) => {
    let resultArray = [];

    Mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        let cursor = db.collection("wine").find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err)
            resultArray.push(doc)
        }, function() {
            db.close;
            res.render("index", {
                items: resultArray
            });
        });
    });
});

router.post("/insert", (req, res) => {

    let insert = {
        type: req.body.type,
        year: req.body.year,
        name: req.body.name,
        country: req.body.country
    }

    Mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection("wine").insertOne(insert, function(err, result) {
            assert.equal(null, err)
            console.log("item inserted")
            db.close;
        });
    });
});