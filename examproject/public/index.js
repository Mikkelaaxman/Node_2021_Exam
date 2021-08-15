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
                div.style = "margin: 20px"
                let card = document.createElement("div")
                card.className = "card text-center"
                let header = document.createElement("div")
                header.className = "card-header bg-dark text-white"
                header.textContent = "Type: " + wine.type;
                let likeheader = document.createElement("div")
                likeheader.textContent = "Likes: " + wine.likes;
                likeheader.style = "color:green; margin-left:120px";
                header.appendChild(likeheader)
                let body = document.createElement("div")
                body.className = "card-body bg-secondary text-white"
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
                btn.className = "btn btn-dark";
                btn.value = "Edit"
                btn.onclick = (function (wine) { return function () { editWine(wine); } })(wine);

                let footer = document.createElement("div")
                footer.className = "card-footer text-muted text-white bg-dark"
                let date = new Date(wine.date)
                let day = date.getDate();
                let month = date.getMonth() +1;
                let year = date.getFullYear(); 
                footer.textContent = "Created on " + day + "-" + month + "-" + year;

                body.appendChild(title)
                body.appendChild(image)
                body.appendChild(p)
                body.appendChild(btn)
                card.appendChild(header)
                card.appendChild(body)
                card.appendChild(footer)
                div.appendChild(card)
                cards.appendChild(div);

            }
        }).catch(error => (console.log(error)));
}
function editWine(wine) {
    window.location.href = "/edit/" + wine._id;
    console.log("EDIT WINE CALLED WITH " + wine._id)
}

getUploads();