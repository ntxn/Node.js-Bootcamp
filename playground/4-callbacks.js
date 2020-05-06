setTimeout(() => {
  console.log("Two seconds are up");
}, 2000);

const names = ["Andrew", "Jen", "Jess"];
const shortNames = names.filter((name) => name.length <= 4);

const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      lat: 0,
      lng: 0,
    };
    callback(data);
  }, 2000);
};

geocode("Philadelphia", (data) => {
  console.log(data);
});

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (a, b, cb) => {
  setTimeout(() => {
    cb(a + b);
  }, 3000);
};

add(1, 4, (sum) => {
  console.log(sum); // Should print: 5
});

const doWorkCallback = (callback) => {
  setTimeout(() => {
    // callback("This is my error");
    callback(undefined, [1, 2, 3]);
  }, 2000);
};

doWorkCallback((err, result) => {
  if (err) return console.log(err);
  console.log(result);
});
