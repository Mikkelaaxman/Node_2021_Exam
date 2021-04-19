const router = require("express").Router();

/*
    Project Schema
        Title - (string)
        Description: (string)
        StartDate: (date)
        EndDate: (date)
        Language(s): (array)
        Tech used: (array)
        Image: (string)
        HostedLink: (string)
        GitLink: (string)
*/

/* On the projects page fetch all the projects from the route below */


const projects = [{
    title: "Nodefolio",
    description: "Personal portfolio implemented in Node.js",
    startDate: new Date("2021-04-08"),
    endDate: new Date("2021-04-15"),
    gitLink: "https://github.com/anderslatif/Kea_DAT_Node_2021_SPRING.git/2/5._Nodefolio"
}, {
    title: "new project",
    description: "This is the newest thing that I'm sinking my time into"
}];

router.get("/api/projects", (req, res) => {
    res.send({ projects });
});

module.exports = {
    router
};