
async function getWines() {
    const response = await fetch("/api/wine")

    if (!response.ok) {
        throw new Error("An error has occured: " + response.text)
    }
    const dataSet = await response.json();
    return dataSet;

}

//Emitting Like Event
async function likeWine(wine, index, socket) {
    //event emitter 
    socket.emit("wineLiked", {
        wine: wine, index: index
    });
}

//Subscribing to Like Event
async function likeSubscribe(socket, table) {

    //Event subscribtion
    socket.on("likeThisWine", (data) => {

        //Change number of likes in the cell +1
        let prevLikes = Number(table.rows[data.index].cells[5].textContent);
        table.rows[data.index].cells[5].textContent = prevLikes + 1;
        //Its just visual changing of the cell, doesnt actually fetch wine info again
    });

    //Event subscribtion for single socket. Connects to DB. 
    socket.on("likeThisWineDB", (data) => {

        const wine = data.wine;

        //Patch wine with +1 like to db
        fetch("api/likeWine", {
            method: "PATCH",
            headers: { "Content-Type": "application / json" },
            body: JSON.stringify(wine)
        }).catch((err) => {
            console.error(err);
        });

    });
}
//On load of doc
$(document).ready(function () {
    const socket = io();

    let table = document.getElementById("wineTable");

    //Get all wines
    getWines().then(dataSet => {

        for (let i = 0; i < dataSet.foundWines.length; i++) {

            // Create an empty <tr> element and add it to the 1st position of the table:
            let row = table.insertRow(i); //+1 because header is 0

            // Insert new cells (<td> elements) at the the "new" <tr> element:
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);
            let cell7 = row.insertCell(6);
            let cell8 = row.insertCell(7);

            wine = dataSet.foundWines[i];
            // Add some text to the new cells:
            cell1.textContent = wine.name;
            cell2.textContent = wine.country;
            cell3.textContent = wine.type;
            cell4.textContent = wine.year;
            cell5.textContent = wine.price;
            cell6.textContent = wine.likes;

            //Create a like and edit button for each wine 
            var likebtn = document.createElement('input');
            likebtn.type = "button";
            likebtn.className = "btn btn-success";
            likebtn.value = "Like!"
            cell7.appendChild(likebtn);
            likebtn.onclick = (function (wine) { return function () { likeWine(wine, i, socket); } })(wine);

            var btn = document.createElement('input');
            btn.type = "button";
            btn.className = "btn btn-primary";
            btn.value = "Edit"
            cell8.appendChild(btn);
            btn.onclick = (function (wine) { return function () { editWine(wine); } })(wine);
        }

        //Sends the "person" connected and the whole table to socket handler // could probaly just be the row
        likeSubscribe(socket, table);
    }).catch(error => {
        error.message;
    });
});

//On click edit redirect to Edit page with id in parameter
function editWine(wine) {
    window.location.href = "/edit/" + wine._id;
}