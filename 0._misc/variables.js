//"use strict";

// never EVER do this
totalGlobalVariable = "My total global variable";

console.log(totalGlobalVariable);

let someVarToDelete = "Don't hurt me";
delete someVarToDelete;

console.log(someVarToDelete);


// type coershion

//always compare both value and types with === and !==
let variableA;
let variableB;

//takes as a number
console.log(variableA + variableB);
//takes as a function
console.log(variableA, variableB);

// are objects trutly immutable in JavaScript?
// No

const myObject = {
    attribute: "value"
};

myObject.attribute = "other value";
console.log(myObject);


//scope

{
   // this is a new scope
   let scopedVariable = "abc";
   {
       //this is a nested scope
        let scopedVariable = 123;
        console.log(scopedVariable);
   }
   console.log(scopedVariable);
}