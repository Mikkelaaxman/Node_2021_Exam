// fetch("/api/projects").then(res => res.json()).then(console.log);

(async function getProjects() {
    try {
        const response = await fetch("/api/projects");
        const result = await response.json();

        const projectsDiv = document.getElementById("projects");

        result.projects.map(project => {
            const projectDiv = document.createElement("div");

            const titleHeader = document.createElement("h2");
            titleHeader.classList.add("project-title");
            titleHeader.innerText = project.title;

            const descriptionP = document.createElement("p");
            descriptionP.classList.add("project-description");
            descriptionP.innerText = project.description;

            const link = document.createElement("a");
            link.classList.add("project-gitLink");
            link.innerText = project.gitLink;
            link.href = project.gitLink;


            projectDiv.appendChild(titleHeader);
            projectDiv.appendChild(descriptionP);
            projectsDiv.appendChild(projectDiv);
            projectDiv.appendChild(link);
        });
    } catch (error) {
        console.log(error);
    }
})();