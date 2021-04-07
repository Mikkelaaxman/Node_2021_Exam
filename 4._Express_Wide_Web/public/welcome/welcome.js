$("body").css("background-color", "blue")


let pizzas = 0;
$(document).click((event) => {
    pizzas++;
    $("#pizza-oven").append(`<strong id="pizza-${pizzas}" style='font-size: 50px'>o</strong>`);

    if (pizzas > 5) {
        const pizzaToRemove = pizzas-5;
        $("#pizza-"+pizzaToRemove).remove();
        
        $("#pizza-counter").append(`<strong style='font-size: 50px'>o</strong>`);
    }
});

