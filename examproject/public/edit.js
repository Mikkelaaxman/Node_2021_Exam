
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

        //Set all fields values to correct values 
        let nameField = document.getElementsByName("name");
        nameField.value = wine.name;
        let typeField = document.getElementsByName("type")
        typeField.value = wine.type;

    })

    
});

async function getWine(id) {
    const response = await fetch("/api/get_wine/" + id)

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