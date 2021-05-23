const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/my_wines", (req, res) => {
    res.sendFile(`${__dirname}/public/my_wines.html`);
});

app.get("/see_wine", (req, res) => {
    res.sendFile(`${__dirname}/public/see_wine.html`);
});

app.post("/see_wine", (req, res) => {
    res.sendFile(`${__dirname}/public/see_wine.html`);
});

app.delete("/wine/:id", (req, res) => {
    db.collection('items').remove({ _id: mongodb.ObjectID(req.params.id) }, (err, result) => {
        if (err) return console.log(err)
        console.log(req.body)
        res.redirect('/')
    })
})

app.patch("/wine/:id", function(req, res) {
    let updateObject = req.body; // {last_name : "smith", age: 44}
    let id = req.params.id;
    db.users.update({ _id: ObjectId(id) }, { $set: updateObject });
});

const port = process.env.PORT || 8080;

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port:", Number(port));
});