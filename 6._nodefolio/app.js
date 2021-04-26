const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const projectsRouter = require("./routes/projects.js");
const contactRouter = require("./routes/contact.js");

app.use(projectsRouter.router);
app.use(contactRouter.router);

const fs = require("fs");

const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");

const frontPage = fs.readFileSync(__dirname + "/public/frontpage/frontpage.html", "utf-8");
const projectsPage = fs.readFileSync(__dirname + "/public/projects/projects.html", "utf-8");
const contactPage = fs.readFileSync(__dirname + "/public/contact/contact.html", "utf-8");
const skillsPage = fs.readFileSync(__dirname + "/public/skills/skills.html", "utf-8");
const toast = fs.readFileSync(__dirname + "/public/toast/toast.html", "utf-8");

app.get("/", (req, res) => {
    res.send(header + frontPage + footer + toast);
});

app.get("/projects", (req, res) => {
    res.send(header + projectsPage + footer + toast);
});

app.get("/contact", (req, res) => {
    res.send(header + contactPage + footer);
});

app.get("/skills", (req, res) => {
    res.send(header + skillsPage + footer);
});

const server = app.listen(process.env.PORT || 8080, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("The server is running on", server.address().port);
});