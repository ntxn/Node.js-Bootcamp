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
