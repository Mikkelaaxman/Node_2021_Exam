document.addEventListener("submit", (e) => {

    e.preventDefault(); // Prevent the default form submit

    // Store reference to form to make later code easier to read
    const form = e.target;
    const formData = new FormData(form);

    const alert = document.getElementById("alert");

    formValidate(form).then(val => {

        if (val != "OK") {
            console.log("Error:" + val)

            alert.textContent = val;
            alert.hidden = false;
            return false; // Cancels event

        } else {

            // Post data using the Fetch API
            fetch(form.action, {
                method: form.method,
                body: JSON.stringify(formData),
            })

                // We turn the response into text as we expect HTML
                .then((res) => res.text())
                /* {
                    alert.textContent = res.text();
                    alert.hidden = false
                    setTimeout(
                        () => {
        
                            goBack();
                        },
                        3000    //wait 3 sec
                    );
                } */

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
                })
                .catch((err) => {

                    // Unlock form elements
                    Array.from(form.elements).forEach(field => field.disabled = false);

                    // Some form of connection failure


                    alert.textContent = err;
                    alert.hidden = false;
                    console.log(err);
                });

            // Disable all form elements to prevent further input
            Array.from(form.elements).forEach((field) => (field.disabled = true));

            // Make sure connection failure message is hidden
            alert.hidden = true;
        }
    });

});
