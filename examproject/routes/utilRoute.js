const router = require("express").Router();
const db = require("../db")

const dbName = process.env.UTILDB;
const collection = process.env.UTILCOL;

//Read all Countries
router.get("/api/countries", (req, res) => {

    const list = db.get(dbName).collection(collection);

    list.find().toArray((error, foundCountries) => {
        if (error) {
            throw error;
        }
        res.send({ foundCountries })
    });
});

module.exports = {
    router
};