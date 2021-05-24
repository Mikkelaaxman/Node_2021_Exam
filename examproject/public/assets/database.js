function getUploads() {
    fetch('/api/see_wine')
        .then(result => result.json())
        .then(json => {
            console.log(json)
            for (let i = 0; i < 2; i++) {
                const wine = json.foundWines[i];
                document.getElementById("database").append("<p>" + wine.name + " made in " + wine.country + ", " + wine.year + "</p>")
            }
        }).catch(error => (console.log(error)));
}


getUploads();

function formattedWine(wine) {
    return `<strong>${wine.name}</strong> made in ${wine.country} (${wine.year})`;
}

function formattedWine(wine) {
    return `<td>${wine.name}</td><td>${wine.country}</td>`
}