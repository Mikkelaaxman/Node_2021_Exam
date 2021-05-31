
/* let dataSet = [
    { "_id": "60b2b12fcc9f7f4518a97592", "type": "Red", "year": "2019", "name": "Hardcoded Zin", "country": "USA, California" }
];
 */
//doesnt work 
async function getWines() {
    const response = await fetch("/api/see_wine")

    /*         .then(result => result.json())
            .then(json => {
    
                for (let i = 0; i < Object.keys(json.foundWines).length; i++) {
                    dataSet.push(json.foundWines[i]);
                    console.log("Inside async "+ dataSet[i]);
                }
                return dataSet;
            }) */
    if (!response.ok) {
        throw new Error("An error has occured: " + response.text)
    }
    const dataSet = await response.json();
    return dataSet;

}


function editWine(wine) {

    console.log("EDIT WINE CALLED WITH " + wine._id)
}
function likeWine(wine) {

    console.log("LIKE wine called with id: " + wine._id)
}


$(document).ready(function () {


    //console.log(dataSet[0]);

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

    getWines().then(dataSet => {

        dataSet;

        console.log(dataSet.foundWines);

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
            cell1.innerHTML = wine.name;
            cell2.innerHTML = wine.country;
            cell3.innerHTML = wine.type;
            cell4.innerHTML = wine.year;
            cell5.innerHTML = wine.price;

            var likebtn = document.createElement('input');
            likebtn.type = "button";
            likebtn.className = "btn btn-success";
            likebtn.value = "Like!"
            cell6.appendChild(likebtn);
            likebtn.onclick = (function (wine) { return function () { likeWine(wine); } })(wine);

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


    /*      Proper way to do it, but cant appendChild to cell 
            var btn = document.createElement('input');
            btn.type = "button";
            btn.className = "btn";
            btn.value = dataSet[i]._id;
           // btn.onclick = (function (value) { return function () { editWine(dataset); } })(entry);
    
            cell5.appendChild(btn); */


});


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