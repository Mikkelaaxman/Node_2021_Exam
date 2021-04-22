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
        title: "Mandatory 1",
        description: "What we have learned implemented in Node.js",
        startDate: new Date("2021"),
        endDate: new Date("2021"),
        gitLink: "https://github.com/victorwp288/kea_node/tree/main/5.mandatory"
    },
    {
        title: "Mandatory 2",
        description: "Personal portfolio implemented in Node.js",
        startDate: new Date("2021"),
        endDate: new Date("2021"),
        gitLink: "https://github.com/victorwp288/kea_node/tree/main/6._nodefolio"
    },
    {
        title: "Express wide web",
        description: "Diffrent technics implemented in Node.js",
        startDate: new Date("2021"),
        endDate: new Date("2021"),
        gitLink: "https://github.com/victorwp288/kea_node/tree/main/4._Express_Wide_Web"
    }
];

router.get("/api/projects", (req, res) => {
    res.send({ projects });
});

module.exports = {
    router
};