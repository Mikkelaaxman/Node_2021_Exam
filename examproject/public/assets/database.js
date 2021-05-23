function getUploads() {
    fetch('/see_wine')
        .then(result => result.json())
        .then(json => {
            console.log(json.data[0].person)
            for (let i = 0; i < 2; i++) {
                const wine = json.data[i].wine;
                document.getElementById("database").append("<li>" + wine + "<li>")
            }
        })
}

getUploads();