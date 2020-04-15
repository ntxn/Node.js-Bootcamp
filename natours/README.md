- ## EXPRESS
  - <img src="screenshots/express-definition.png" width="800">
  - Install with npm: `npm i express@4`
  - It is a convention to have all express configuration in `app.js`
  - <a href="https://github.com/ngannguyen117/Node.js-Bootcamp/commit/59e1b0bbefa2476c59b13403f30b1b210c23055d">Basic Routing with Express</a> In `app.js`:
    - `express` is a function that upon calling will add a bunch of methods to the `app` variable
    ```js
    const express = require('express');
    const app = express();
    app.listen(3000, () => {}); // To start up a server at port #3000
    ```
    - We need to define routes. Routing means how the application responds to the client's requests (certain urls & HTTP methods used for that request)
    - `get`: HTTP GET method, `'/'`: Endpoint/URL, the rest is the callback function (called `route handler`) with request and response object parameters. `.json` automatically sets the `Content-Type: application/json` while `.send` only sends text.
    ```js
    app.get('/', (req, res) => {
      res
        .status(200)
        .json({ message: 'Hello from the server side', app: 'Natours' });
    });
    ```
  - <a href="https://github.com/ngannguyen117/Node.js-Bootcamp/commit/897f1a90b031a3587644b7cbd3e1f43446e4625b">APIs and RESTful API Design</a>
    - API: Application Programming Interface - A piece of software used by another piece of software to allow applications to talk to each other. APIs aren't only used to send data and not always related to web development. `Application` can mean many other things as long as the piece of software relatively stands alone. For example: `fs`, `http` modules in Node.js are APIs <= Node APIs, Browser's DOM JS API, etc.
    - The REST Architecture: REpresentational State Transfer - a way of building web APIs in a logical way making them easy to consume
      - <img src="screenshots/restful-1.png" width="800">
      - <img src="screenshots/restful-2.png" width="800">
      - <img src="screenshots/restful-3.png" width="800">
      - <img src="screenshots/restful-4.png" width="800">
