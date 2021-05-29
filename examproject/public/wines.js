let dataSet = [{
    _id: "60b0e39d51adbd85b5a09c24",
    type: 'red',
    year: 1990,
    name: 'TEST1 WINE ',
    country: 'france'
},
{
    _id: "60b0e4170412be4b50e1294d",
    type: 'white',
    year: 2021,
    name: 'generic white wine',
    country: 'france'
}];

//doesnt work 
function getWines() {
    fetch("/api/see_wine")
        .then(result => result.json())
        .then(json => {

            json.foundWines.forEach(wine => {
                dataSet.push(wine)
            });
            

        }).catch(error => (console.log(error)));
}

$(document).ready(function () {
    getWines();
    console.log("Now creating table beginning with " + dataSet[0].name)
    $("#wineTable").DataTable({
        data: dataSet[0], //Should just be dataset but gets error with missing row 0? 
        columns: [
            { title: "_id" },
            { title: "type" },
            { title: "year" },
            { title: "name" },
            { title: "country" },
            
        ]
        
    });
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