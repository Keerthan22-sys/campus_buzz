var name = "Keerthan";
var name = "Duplicate!"; // No error 

let age =24;
age = 25;

const PI = 3.14;
PI = 3.14;

if (true) {
    var x = "I out!"; // Accessible outside the block
    let y = "I am block scoped!"; // only accessible within this block
    const z = `I am also block scoped!`; // only accessible within this block
}

console.log(x); // Accessible
console.log(y); // Error: y is not defined
console.log(z); // Error: z is not defined

// Arrow function

// Traditional function
function greet(name) {
    return "Hello, " + name + "!";
}

// Arrow function
const greetArrow = (name) => {
    return `Hello, ${name}!`;
};

// Concise arrow function
const greetConcise = name => `Hello, ${name}!`;

console.log(greet("Keerthan"));


// Template literals
const firstName = "Keerthan";
const semester = 6;
const fullName = `${firstName} ${semester}`;
console.log(fullName); // Output: Keerthan 6
// Old way
const msg1 = "Hello " + firstName + ", you are in semester " + semester;

// New way using template literals
const msg2 = `Hello ${firstName}, you are in semester ${semester}`;
console.log(msg2); // Output: Hello Keerthan, you are in semester 6

// Object destructuring
const student = {
    name: "Keerthan",
    age: 24,
    semester: 6
};

// Old way
const nameOld = student.name;
const ageOld = student.age;
const semesterOld = student.semester;

// New way using destructuring
const { name, age, semester } = student;

// Array methods
const students =[
    { name: "Keerthan", age: 24 },
    { name: "Alice", age: 22 },
    { name: "Bob", age: 23 }
]

const names = students.map(student => student.name);
console.log(names); // Output: ["Keerthan", "Alice", "Bob"]

const adults = students.filter(student => student.age >= 23);
console.log(adults); // Output: [{ name: "Keerthan", age: 24 }, { name: "Bob", age: 23 }]

const totalAge = students.reduce((sum, student) => sum + student.age, 0);
console.log(totalAge); // Output: 69

const averageAge = totalAge / students.length;
console.log(averageAge); // Output: 23

const rahul = students.find(student => student.name === "Rahul");
console.log(rahul); // Output: undefined (since Rahul is not in the array)

// Chaining methods (Very commmon in React)
// "Namees of students who are 23 or older"
const namesOfAdults = students
    .filter(student => student.age >= 23)
    .map(student => student.name);
console.log(namesOfAdults); // Output: ["Keerthan", "Bob"]

// Promise

// Simulating an API call with a Promise
function fetchStudentData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 1) {
                resolve({ name: "Keerthan", age: 24, semester: 6 });
            } else {
                reject("Student not found");
            }
        }, 1000); // Simulates 1 second network delay
    });
}

// Modern way - async/await (read like synchronus code)
async function getStudent() {
    try {
        const studentData = await fetchStudentData(1);
        console.log(studentData); // Output: { name: "Keerthan", age: 24, semester: 6 }
    } catch (error) {
        console.error(error); // Output: Student not found (if id is not 1)
    }
}

// Real example of async/await with fetch API
async function fetchUserData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const userData = await response.json();
        console.log("API Data:", userData); // Output: User data from the API
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

// math-utils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export default function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

// main.js
import divide, { add, subtract, multiply } from "./math-utils.js";