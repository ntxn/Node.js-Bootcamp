- ## EXPRESS
  - <img src="screenshots/express-definition.png" width="800">
  - Install with npm: `npm i express@4`
  - It is a convention to have all express configuration in `app.js`
  - In `app.js`:
    - `express` is a function that upon calling will add a bunch of methods to the `app` variable
    ```js
    const express = require('express');
    const app = express();
    app.listen(3000, () => {}); // To start up a server at port #3000
    ```
    - We need to define routes. Routing means how the application responds to the client's requests (certain urls & HTTP methods used for that request)
    - `get`: HTTP GET method, `'/'`: Endpoint/URL, the rest is the callback function with request and response object parameters. `.json` automatically sets the `Content-Type: application/json` while `.send` only sends text.
    ```js
    app.get('/', (req, res) => {
      res
        .status(200)
        .json({ message: 'Hello from the server side', app: 'Natours' });
    });
    ```
