function getUploads() {
    fetch('/api/see_wine')
        .then(result => result.json())
        .then(json => {
            console.log(json)


            const card = document.getElementById("card").cloneNode(true);
            
            for (let i = 0; i < Object.keys(json.foundWines).length; i++) {
                const wine = json.foundWines[i];

                //Clones a new card for every element in array
                document.getElementById("cards").appendChild(card);
                
                document.getElementsByClassName("card-header")[i].append(wine.country);
                document.getElementsByClassName("card-text")[i].append(wine.type + ". Year: " + wine.year);
                document.getElementsByClassName("card-title")[i].append(wine.name);

            }
        }).catch(error => (console.log(error)));
}


getUploads();