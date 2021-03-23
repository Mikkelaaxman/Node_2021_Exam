function myFirstFunction() {
    return "Greetings";
}


function sayHiLater(anyFunction) {
    anyFunction();
}

const sayHi = () => {
    console.log("hi")
};
sayHiLater(sayHi)


const sayHello = () => {
    console.log("hello")
}
sayHiLater(sayHello)



function interact(generic, name) {
    console.log(generic(name));
}

const poke = (name) => {
    return "poke", name;
}

interact(poke, "victor");
interact((name) => "lick " + name, "Biden");
