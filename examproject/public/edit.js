
function goBack() {
    window.history.back();
}

$(document).ready(function () {

    
    let full_url = document.URL; // Get current url
    let url_array = full_url.split('/') // Split the string into an array with / as separator
    let last_segment = url_array[url_array.length - 1];  // Get the last part of the array (-1)
    console.log("URL ID "+last_segment); // Alert last segment
    
    getWine(last_segment).then(wine => {
        wine;

        foundWine = wine.foundWines[0]

        console.log(foundWine.name)
       
        //Set all fields values to correct values 
        let nameField = document.getElementById("name");
        nameField.value = foundWine.name;
        let typeField = document.getElementById("type")
        typeField.value = foundWine.type;
        let yearField = document.getElementById("year")
        yearField.value = foundWine.year;
        let countryField = document.getElementById("country")
        countryField.value = foundWine.country;
        let priceField = document.getElementById("price")
        priceField.value = foundWine.price;
        let imgField = document.getElementById("imageURL")
        imgField.value = foundWine.imageURL;
        let idField = document.getElementById("_id")
        idField.value = foundWine._id;

    })

    
});

async function getWine(id) {
    const response = await fetch("/api/see_wine/" + id)
    if (!response.ok) {
        throw new Error("An error has occured: " + response.text)
    }
    const wine = await response.json();
    return wine;

}

// Make an HTTP PUT Request
async function deleteWine(url) {
    document.getElementById('id01').style.display = 'block'

    // Awaiting fetch which contains 
    // method, headers and content-type
    const response = await fetch("wine/:id", {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    });

    // Awaiting for the resource to be deleted
    const resData = 'resource deleted...';

    // Return response data 
    return resData;
};