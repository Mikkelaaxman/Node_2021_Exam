function goBack() {
    window.history.back();
}

$(document).ready(function () {
    let dropdown = document.getElementById('country-dropdown');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose Country';

    dropdown.add(defaultOption);



    getCountries().then(data => {

        for (let i = 0; i < data.foundCountries.length; i++) {
            option = document.createElement('option');
            option.text = data.foundCountries[i].name;
            option.value = data.foundCountries[i].name; // Could be country code instead
            dropdown.add(option);
        }


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

//Changing default behaviour of FORM here, but doesnt work yet.
//FormData probably isnt filled because form is async from getwine. need to wait for form to be filled.
//Use util.promisify?

document.addEventListener("submit", (e) => {

    e.preventDefault(); // Prevent the default form submit

    // Store reference to form to make later code easier to read
    const form = e.target;
    console.log(form);
    const data = new FormData(form);
    console.log( document.getElementById("country-dropdown").value)
/*     data.append("name", form.name.value)
    data.append("type", form.type.value) */

    var object = {};
    data.forEach((value, key) => object[key] = value);
    var json = JSON.stringify(object);

    console.log(json);
    // Post data using the Fetch API
    fetch(form.action, {
        headers: { "content-type": "application / json" },
    //    contentType: "multipart / form-data",
    //  enctype='application/x-www-form-urlencoded',
     //   contentType: "",
        method: form.method,
        body: json
        
    //    processData: false,

    //    contentType: false,
    }).then(res => {

        console.log(res.text())
    })
        .catch((err) => {

        
            console.log(err);
        });


});

async function formValidate(form) {
    const formData = new FormData(form);

    console.log(formData)
    //Type
    const type = formData.get("type");
    console.log(type)
    console.log("ACTION " + formData.get("action"))

    if (type != "Red") {

        return "type failed validation"
    }

    //Year
    const year = formData.get("year");
    console.log(year)

    if (year <= 1900 || year >= 3000) {
        console.log("year failed")

        return "Year Failed Validation"
    }

    //Name 
    if (typeof (formData.get("name")) != "string") {
        console.log("name failed")
        return "Name Validation Failed"

    }

    //Price 
    const price = Number(formData.get("price"))
    if (typeof price != "number" || price < 0) {
        console.log("Number")
        return "Price Validation Failed"
    }

    //Image URL 
    let urlRGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    let urlTest = urlRGEX.test(formData.get("url"));
    if (!urlTest) {
        console.log("url failed")

        return "URL validation Failed"
    }
    return "OK";
}