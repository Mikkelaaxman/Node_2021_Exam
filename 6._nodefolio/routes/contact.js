const router = require("express").Router();

router.post("/api/contact", (req, res) => {
    // todo send email
    res.redirect("/")
});

module.exports = {
    router
};