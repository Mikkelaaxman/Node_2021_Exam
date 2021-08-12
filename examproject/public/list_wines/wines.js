
/* HARDCODE DATA
let dataSet = [
    { "_id": "60b2b12fcc9f7f4518a97592", "type": "Red", "year": "2019", "name": "Hardcoded Zin", "country": "USA, California" }
];
 */

async function getWines() {
    const response = await fetch("/api/wine")

    if (!response.ok) {
        throw new Error("An error has occured: " + response.text)
    }
    const dataSet = await response.json();
    return dataSet;

}



async function likeWine(wine, index, socket) {

    //event emitter 
    socket.emit("wineLiked", {
        wine: wine, index: index
    });

    console.log("LIKE wine called with id: " + wine._id)
}

async function likeSubscribe(socket, table) {

    //Event subscribtion
    socket.on("likeThisWine", (data) => {

        //Change number of likes in the cell +1
        let prevLikes = Number(table.rows[data.index].cells[5].textContent);
        table.rows[data.index].cells[5].textContent = prevLikes + 1;

        console.log(Object.values(data.wine));

        const wine = data.wine;
        wine.likes += 1;

        console.log("new likes " + wine.likes)
        /*         console.log("likes " + data.wine.likes)
        data.wine.likes = data.wine.likes + 1;
        console.log("likes after " + data.wine.likes) */


        //Patch wine to db
        fetch("api/likeWine", {
            method: "PATCH",
            headers: { "Content-Type": "application / json" },
            body: JSON.stringify(wine)
        }).catch((err) => {
            console.error(err);
        });

    });
}

$(document).ready(function () {
    const socket = io();

    let table = document.getElementById("wineTable");

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
        likeSubscribe(socket, table);
    }).catch(error => {
        error.message;
    });

});

function editWine(wine) {
    window.location.href = "/edit/" + wine._id;

}