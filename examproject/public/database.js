function getUploads() {
    fetch('/see_wine')
        .then(result => result.json())
        .then(json => {
            console.log(json.data[0].person)
            for (let i = 0; i < 2; i++) {
                const person = json.data[i].person;
                $('#database').append('<li>' + person + '</li>')
            }
        })
}

getUploads();

$('database').append('<li>Hejsa</li>')