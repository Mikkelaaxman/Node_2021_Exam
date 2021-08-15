
function goBack() {
    window.history.back();
}

$(document).ready(function () {

    let dropdown = document.getElementById('country-dropdown');
    dropdown.length = 0;
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose Country';
    dropdown.add(defaultOption);

    let full_url = document.URL; // Get current url
    let url_array = full_url.split('/') // Split the string into an array with / as separator
    let last_segment = url_array[url_array.length - 1];  // Get the last part of the array (-1)

    getCountries().then(data => {

        for (let i = 0; i < data.foundCountries.length; i++) {
            option = document.createElement('option');
            option.text = data.foundCountries[i].name;
            option.value = data.foundCountries[i].name; // Could be country code instead
            dropdown.add(option);
        }


    }).then(
        getWine(last_segment).then(wine => {


            foundWine = wine.foundWines[0]

            console.log(foundWine.name)
            console.log("price" + foundWine.price + "url " + foundWine.imageURL);

            //Set all fields values to correct values 
            let nameField = document.getElementById("name");
            nameField.value = foundWine.name;
            let typeField = document.getElementById("type")
            typeField.value = foundWine.type;
            let yearField = document.getElementById("year")
            yearField.value = foundWine.year;
            /*         let countryField = document.getElementsById("country-dropdown")
                    countryField.value = foundWine.country; */
            let priceField = document.getElementById("price")
            priceField.value = foundWine.price;
            let imgField = document.getElementById("url")
            imgField.value = foundWine.imageURL;
            let idField = document.getElementById("_id")
            idField.value = foundWine._id;
            console.log("ID IS " + foundWine._id)


        })).catch((error) => {
            console.error(error)
        });


});

async function getCountries() {
    const response = await fetch("/api/countries")

    if (!response.ok) {
        throw new Error("An error has occured: " + response.text)
    }
    const dataSet = await response.json();
    return dataSet;
}

async function getWine(id) {
    const response = await fetch("/api/wine/" + id)
    if (!response.ok) {
        throw new Error("An error has occured: " + response.text)
    }
    const wine = await response.json();
    return wine;

}

async function deleteWine(id) {
    //document.getElementById('id01').style.display = 'block'

    // Awaiting fetch which contains 
    // method, headers and content-type
    fetch("/api/wine/" + id, {
        method: "DELETE"
    }).then(
        function () {
            goBack()

        }
    ).catch((error) => {
        console.error(error)
    });

};

document.addEventListener("submit", (e) => {

    e.preventDefault(); // Prevent the default form submit

    // Store reference to form to make later code easier to read
    const form = e.target;

    const response = formValidate(form);

    if (response != "OK") {
        console.error(response)
        const alert = document.getElementById("alert");
        alert.textContent = response;
        alert.hidden = false;
    } else {
        editWine(form);
        Array.from(form.elements).forEach(field => field.disabled = true);
    }
});

async function editWine(form) {
    const data = new FormData(form);
    const alert = document.getElementById("alert");

    //data.append("country", document.getElementById("country-dropdown").value)

    //If we need it in json format
    /*     var object = {};
        data.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);    
         */

    //also possible to append json to the formdata prototype 
    //data.append("json", json);

    (async () => {
        const response = await fetch(form.action, {
            method: "PATCH",
            body: data

            //  headers: { "Content-Type": "application / json" },
            //  contentType: "multipart / form-data",
            //  enctype='application/x-www-form-urlencoded',
            //  processData: false,

        })
            .then(function (res) {


                let btn = document.createElement("input");
                btn.type = "button"
                btn.value = "Go Back"
                btn.className = "button btn-success";
                btn.onclick = (function () { return function () { goBack() } })();

                alert.appendChild(btn);
                alert.hidden = false;
            })
            .catch((err) => {
                console.log(err);
                alert.textContent = err;
                alert.hidden = false;
                Array.from(form.elements).forEach(field => field.disabled = false);

            });
    })();
}

function formValidate(form) {
    const formData = new FormData(form);

    console.log(form.action)
    //API
    if (form.action == undefined) {
        console.log(form.action)

        return "Form action error"
    }

    //Type !type.equals ("Red") || type != "White" || type != "Rose" || type != "Dessert" || type != "Other"
    const type = formData.get("type");
    const enums = ["Red", "White", "Rose", "Dessert", "Other"]
    if (!enums.includes(type)) {
        return "type can't be that"
    }

    //Year
    const year = formData.get("year");
    console.log(year)
    //Year is string here but js can compare it
    if (year <= 1900 || year >= 3000) {

        return "Year Failed Validation"
    }

    //Name
    if (typeof (formData.get("name")) != "string") {
        return "Name type Validation Failed"
    }
    //Matches letters, numbers, space, dash and hyphen
    let nameRGEX = /([ÆØÅæøåA-Za-z0-9\s\'\-])+/;
    if (!nameRGEX.test(formData.get("name"))) {
        return "Name must only be numbers and letters"
    }

    //Country
    console.log("country is " + formData.get("country"))
    if (formData.get("country") == "Choose Country") {
        return "Country cant be that"
    }

    //Price
    const price = Number(formData.get("price"))
    if (typeof price != "number" || price < 0) {
        return "Price Validation Failed"
    }

    //Image URL
    let urlRGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    let urlTest = urlRGEX.test(formData.get("url"));
    if (!urlTest) {
        return "URL validation Failed"
    }
    return "OK"
}
