const fs = require('fs');
const superagent = require('superagent'); // to send http requests

/*
  Example of callback hell
  Callbacks inside of callbacks of callbacks
  It makes it hard to read and understand the code

  Output:
  Breed: retriever
  https://images.dog.ceo/breeds/retriever-curly/n02099429_1372.jpg
  Random dog image saved to file
*/
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);
      console.log(res.body.message);

      fs.writeFile(`${__dirname}/dog-img.txt`, res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log('Random dog image saved to file');
      });
    });
});

/*
  Solution 1 for Callback Hell - using Promises
  First, we learn how to consume Promises
  superagent library has Promises builtin with it, the readFile, writeFile in fs module don't
  A Promise basically can be understand as we're promised that we will receive something from the superagent.get function

  When we call superagent.get(`https://dog.ceo/api/breed/${data}/images/random`), we get a pending Promise.
  When it's done and have returned data, it's called a resolved Promise
  So when a resolved Promise comes back, we can use `then` to process a fullfill Promise. For a rejected
  Promise (error), we use `catch`.

  Structure:
    superagent
      .get(`https://dog.ceo/api/breed/${data}/images/random`)   // Pending Promise
      .then(res => console.log(res.body.message))               // Resolved Promise => fullfill
      .catch(err => console.log(err.message));                  // Rejected Promise
*/
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile(`${__dirname}/dog-img.txt`, res.body.message, (err) => {
        console.log('Random dog image saved to file');
      });
    })
    .catch((err) => console.log(err.message));
});

/*
  Promises

  Step 2: Create a Promise for readFile function
  - We don't change the readFile function, we create a new function which behind the scene
  still runs the builtin readFile function but then returns a Promise so that we can use the
  Promise instead of the callback function
  - new Promise((resolve, reject) => { // resolve, reject are functions
      ...
        if (err) reject(...)  // Whatever we pass to the reject function will be the err value we see in the `catch` method
        resolve(...);         // Whatever we pass to the resolve will be the value of a successful Promise, which we get in the `then` method
      ...
    }
  
  Now we can chain one Promise after another by returning the next Promise in the current `then` method
  This way, we get rid of the callback hell and have a flat chain of Promises
*/

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file');
      resolve('Success');
    });
  });
};

readFilePromise(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePromise(`${__dirname}/dog-img.txt`, res.body.message);
  })
  .then(() => console.log('Random dog image saved to file'))
  .catch((err) => console.log(err));

/*
   SOLUTION 2: consuming Promises with Async/Await
   Async/Await allows our code looks more synchronous and increases readability while it's actually
   asynchonous code. Syntactic sugar for Promises
   
   - Step 1: mark a function with the keyword `async` which means this is an asynchronous function.
   This runs the function in the background while the rest of the code running in the event loop.
   The return value of an async function is a resolved promise.
   - Step 2: inside the async function, we can mark multiple line of code with keyword `await`.
   When marking a line of code await, it will wait for that code to finish before moving on to the
   next line. The returned value from an await line of code is the successful resolved Promise
*/
const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePromise(`${__dirname}/dog-img.txt`, res.body.message);
    console.log('Random dog image saved to file');
  } catch (err) {
    console.log(err);
  }
};

getDogPic();

/* --------------- HOW ASYNC/AWAIT works ------------------- */

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePromise(`${__dirname}/dog-img.txt`, res.body.message);
    console.log('Random dog image saved to file');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: READY'; // The return value of an async function is a resolved promise
};

/*
  Output

  1: Will get dog pics
  Promise { <pending> }
  3: Done getting dog pics
  Breed: retriever
  https://images.dog.ceo/breeds/retriever-chesapeake/n02099849_171.jpg
  Random dog image saved to file
*/
console.log('1: Will get dog pics');
const x = getDogPic();
console.log(x);
console.log('3: Done getting dog pics');

/*
  Output

    1: Will get dog pics
    Breed: retriever
    https://images.dog.ceo/breeds/retriever-chesapeake/n02099849_2706.jpg
    Random dog image saved to file
    2: READY
    3: Done getting dog pics

  Output with wrong dogg.txt file
  
    1: Will get dog pics
    I could not find that file
    ERROR
*/
console.log('1: Will get dog pics');
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('3: Done getting dog pics');
  })
  .catch((err) => console.log('ERROR'));

/*
  Solution to not using `then` and `catch` like the above example
*/

(async () => {
  try {
    console.log('1: Will get dog pics');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics');
  } catch (err) {
    console.log('ERROR');
  }
})();
