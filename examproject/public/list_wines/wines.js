
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



function likeWine(wine) {
    
    const socket = io();

    const id = wine._id

    //event emitter 
    socket.emit("wineLiked", {
        id
    });

    //Event subscribtion
    socket.on("thisWineLiked", (data) => {
        console.log("liked WIne : "+ data._id)
/*         let alert = document.createElement("alert")
        alert.value("Liked wine with id " + data) */
    } )
    console.log("LIKE wine called with id: " + wine._id)
}


$(document).ready(function () {

    var table = document.getElementById("wineTable");

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

            wine = dataSet.foundWines[i];
            // Add some text to the new cells:
            cell1.textContent = wine.name;
            cell2.textContent = wine.country;
            cell3.textContent = wine.type;
            cell4.textContent = wine.year;
            cell5.textContent = wine.price;

            var likebtn = document.createElement('input');
            likebtn.type = "button";
            likebtn.className = "btn btn-success";
            likebtn.value = "Like!"
            cell6.appendChild(likebtn);
            likebtn.onclick = (function (wine) {return function () { likeWine(wine); } }) (wine);

            var btn = document.createElement('input');
            btn.type = "button";
            btn.className = "btn btn-primary";
            btn.value = "Edit"
            cell7.appendChild(btn);
            btn.onclick = (function (wine) { return function () { editWine(wine); } })(wine);
        }

    }).catch(error => {
        error.message;
    });

});

function editWine(wine) {
    window.location.href = "/edit/" + wine._id;

}

//for when we add like button 
/* function operateFormatter(value, row, index) {
    return [
        '<a class="like" href="javascript:void(0)" title="Like">',
        '<i class="fa fa-heart"></i>',
        '</a>  ',
        '<a class="remove" href="javascript:void(0)" title="Remove">',
        '<i class="fa fa-trash"></i>',
        '</a>'
    ].join('')
}

window.operateEvents = {
    'click .like': function (e, value, row, index) {
        alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .remove': function (e, value, row, index) {
        $table.Datatable('remove', {
            field: 'id',
            values: [row.id]
        })
    }
} */