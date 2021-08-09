async function getUploads() {
    await fetch('/api/wine')
        .then(result => result.json())
        .then(json => {
            console.log(json)


            const cards = document.getElementById("cards");
            
            for (let i = 0; i < Object.keys(json.foundWines).length; i++) {
                const wine = json.foundWines[i];

                let div = document.createElement("div")
                div.className = "col-lg-3 col-md-6"
                let card = document.createElement("div")
                card.className = "card text-center"
                let header = document.createElement("div")
                header.className = "card-header"
                header.textContent = "Type: " + wine.type;
                let body = document.createElement("div")
                body.className = "card-body"
                let title = document.createElement("h5")
                title.className = "card-title"
                title.textContent = wine.name;
                let p = document.createElement("p")
                p.className = "card-text"
                p.textContent = "Country of origin: " + wine.country + ", Price: " + wine.price;
                let image = document.createElement("img")
                image.className = "img-thumbnail"
                image.src = wine.imageURL;
                image.alt = "Image of wine"

                var btn = document.createElement('input');
                btn.type = "button";
                btn.className = "btn btn-primary";
                btn.value = "Edit"
                btn.onclick = (function (wine) { return function () { editWine(wine); } })(wine);

                let footer = document.createElement("div")
                footer.className = "card-footer text-muted"
                footer.textContent = "2 days ago - ID:" + wine._id;

                body.appendChild(title)
                body.appendChild(image)
                body.appendChild(p)
                body.appendChild(btn)
                card.appendChild(header)
                card.appendChild(body)
                card.appendChild(footer)
                div.appendChild(card)
                cards.appendChild(div);
/*                 
                document.getElementsByClassName("card-header")[i].append(wine.country);
                document.getElementsByClassName("card-text")[i].append(wine.type + ". Year: " + wine.year);
                document.getElementsByClassName("card-title")[i].append(wine.name); */

            }
        }).catch(error => (console.log(error)));
}
function editWine(wine) {
    window.location.href = "/edit/" + wine._id;
    console.log("EDIT WINE CALLED WITH " + wine._id)
}

getUploads();