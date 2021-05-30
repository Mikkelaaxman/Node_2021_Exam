const { router } = require("../routes/read");


$(document).ready(function () {
  
    getWines();
    console.log(dataSet[0]);

/*    DOESNT WORK
     console.log("Now creating table beginning with " + dataSet[0].name)
    $("#wineTable").DataTable({
        data: dataSet, //Should just be dataset but gets error with missing row 0? 
        columns: [
            { title: "_id" },
            { title: "type" },
            { title: "year" },
            { title: "name" },
            { title: "country" },
        ]
    }); */

    var table = document.getElementById("wineTable");

    for (let i = 0; i < dataSet.length; i++) {
        //console.log(dataSet[i]);

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(i+1); //+1 because header is 0

        // Insert new cells (<td> elements) at the the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        wine = dataSet[i];
        // Add some text to the new cells:
        cell1.innerHTML = wine.name;
        cell2.innerHTML = wine.country;
        cell3.innerHTML = wine.type;
        cell4.innerHTML = wine.year;

        cell5.innerHTML = '<button id="editBtn" type="button" class="btn  btn-primary">Edit</button>';

        btn = document.getElementById("editBtn");
        btn.onclick = (function (wine) { return function () { editWine(wine); } })(wine);
/*      Proper way to do it, but cant appendChild to cell 
        var btn = document.createElement('input');
        btn.type = "button";
        btn.className = "btn";
        btn.value = dataSet[i]._id;
       // btn.onclick = (function (value) { return function () { editWine(dataset); } })(entry);

        cell5.appendChild(btn); */
    }
    
});

let dataSet = [
    { "_id": "60b2b12fcc9f7f4518a97592", "type": "Red", "year": "2019", "name": "Øko rød", "country": "Danmark" }
];

//doesnt work 
function getWines() {
    fetch("/api/see_wine")
        .then(result => result.json())
        .then(json => {

            for (let i = 0; i < Object.keys(json.foundWines).length; i++) {
                dataSet.push(json.foundWines[i]);
                console.log(dataSet[i]);
            }

        }).catch(error => (console.log(error)));
}


function editWine(wine){
   
    console.log("EDIT WINE CALLED WITH " + wine._id)
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