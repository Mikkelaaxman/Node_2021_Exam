
function goBack() {
    window.history.back();
}

$(document).ready(function () {


    let full_url = document.URL; // Get current url
    let url_array = full_url.split('/') // Split the string into an array with / as separator
    let last_segment = url_array[url_array.length - 1];  // Get the last part of the array (-1)

    getWine(last_segment).then(wine => {


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
        .catch((error) => {
            console.error(error)
        });


});


async function getWine(id) {
    const response = await fetch("/api/see_wine/" + id)
    if (!response.ok) {
        throw new Error("An error has occured: " + response.text)
    }
    const wine = await response.json();
    return wine;

}

async function deleteWine(id) {
    //document.getElementById('id01').style.display = 'block'

    console.log("ID SEND TO DELETE " + id)
    // Awaiting fetch which contains 
    // method, headers and content-type
    fetch("/api/wine/" + id, {
        method: "DELETE"
    });

    /*     if (!response.ok) {
            throw new Error("An error has occured: " + response.statusText)
        }
        
        // Awaiting for the resource to be deleted
        const resData = await response.json(); */

    // Return response data 
    window.location.href = "/";
};

 
/*  //Changing default behaviour of FORM here, but doesnt work yet.
    //FormData probably isnt filled because form is async from getwine. need to wait for form to be filled. 
    //Use util.promisify?
 
 document.addEventListener("submit", (e) => {
    // Store reference to form to make later code easier to read
    const form = e.target;

    // Post data using the Fetch API
    fetch(form.action, {
        method: form.method, //or "PATCH" 
        body: new FormData(form),
    })

        // We turn the response into text as we expect HTML
        .then((res) => res.text())

        // Let's turn it into an HTML document
        .then((text) => new DOMParser().parseFromString(text, "text/html"))

        // Now we have a document to work with let's replace the <form>
        .then((doc) => {
            // Create result message container and copy HTML from doc
            const result = document.createElement("div");
            result.innerHTML = doc.body.innerHTML;

            // Allow focussing this element with JavaScript
            result.tabIndex = -1;

            // And replace the form with the response children
            form.parentNode.replaceChild(result, form);

            // Move focus to the status message
            result.focus();
        }).catch((err) => {

            // Unlock form elements
            Array.from(form.elements).forEach(field => field.disabled = false);

            // Some form of connection failure
            form.querySelector("[role=alert]").hidden = false;
        });

    // Disable all form elements to prevent further input
    Array.from(form.elements).forEach((field) => (field.disabled = true));

    // Make sure connection failure message is hidden
    form.querySelector("[role=alert]").hidden = true;;
    // Prevent the default form submit
    e.preventDefault();
}); */

