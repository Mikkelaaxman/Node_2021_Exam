// --------------------------------------
// Arrays, for loops
// --------------------------------------
// Exercise 1 - Array Positioning

const letters = ["a","b","c"];
console.log(letters[1]);
// show b in the console 


// --------------------------------------
// Exercise 2 - Array Positioning

const friends = [];
friends.push({victor: "victor"}, {preben: "preben"}, {lone: "lone"});
console.log(friends);
// What a lonely array. Add at least 3 friend objects to it.  


// --------------------------------------
// Exercise 3 - Get the index of first occurance of that value. 

const significantMathNumbers = [0, 2.718, 3.14159, 1729];
console.log(significantMathNumbers.indexOf(1729));

// You want to programmatically find where the number 1729 is in the array.
// programmatically means that no finger counting allowed. There is a method for this (finding index based of value). 


// --------------------------------------
// Exercise 4 - Inserting elements

const diet = ["tomato", "cucumber", "rocket"];
diet.splice(2, 0, "Hamburger", "soda", "pizza");
console.log(diet);

// You are a programmer. In one line (one statement) insert hamburger, soda and pizza between the elements cucumber and rocket




// --------------------------------------
// Exercise 5 - Remove element
diet.pop();
console.log(diet);
// Remove the LAST element of the array.
// Don't remove by index. You know in advance that it's the last in the array because you are too full already. 





// --------------------------------------
// Exercise 6 - Copy array

// You really like your daily diet from last exercise. Copy it to a new array called dinnerTray so you can give it to a friend.  
const dinnerTray = [...diet];
diet.pop();
console.log(diet, dinnerTray);


// --------------------------------------
// Exercise 7 - For loop

const lettersExpanded = ["a","b","c", "d", "e", "f", "g", "h"];

const newArr = []

for (let i = 1; i < lettersExpanded.length; i += 2) {
    newArr.push(lettersExpanded[i]);

}
console.log(newArr.toString());

// log every second char in the array starting from b



// --------------------------------------
// Exercise 8 - For loop and if statement

const numbers  = [5, 3, 2, 7, 11, 12, 0, -20, 6];
const discardedNumbers = [];

for (let i= 0; i < numbers.length; i++) {
    if (numbers[i] > 6 || numbers[i] < 0) {
        console.log(numbers[i])
    }
    else
        discardedNumbers.push(numbers[i]);     
}
console.log(discardedNumbers);





// log the element if the number is above 6 or below 0
// else push them to the array discardedNumbers

// --------------------------------------


