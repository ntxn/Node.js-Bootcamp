const fs = require("fs");

// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday",
// };

// const bookJSON = JSON.stringify(book); // this is a string

// fs.writeFileSync("1-json.json", bookJSON);

// const dataBuffer = fs.readFileSync("1-json.json");
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data);

const dataBuffer = fs.readFileSync("1-json.json");
let dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
data.name = "Ngan";
data.age = 30;

dataJSON = JSON.stringify(data);
fs.writeFileSync("1-json.json", dataJSON);
