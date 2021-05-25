function getUploads() {
    fetch('/api/see_wine')
        .then(result => result.json())
        .then(json => {
            console.log(json)
            for (let i = 0; i < 4; i++) {
                const wine = json.foundWines[i];
                document.getElementById("database").append(wine.name +
                    "made in " + wine.country + ", " + wine.year)
            }
        }).catch(error => (console.log(error)));
}


getUploads();