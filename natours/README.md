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
    - Simple <a href="https://github.com/ngannguyen117/Node.js-Bootcamp/commit/66c91c7012151a95f8040e6ed36264b64252c2c4">GET</a>, <a href="https://github.com/ngannguyen117/Node.js-Bootcamp/commit/c0055573f21d10942147c1f4b4423b27d72d6c68">POST</a>, <a href="https://github.com/ngannguyen117/Node.js-Bootcamp/commit/d2c3a1ccc827bc1e96a987a7a2de7d91c8ad167b">PATCH</a>, <a href="https://github.com/ngannguyen117/Node.js-Bootcamp/commit/8caf015c45bb4644827188eb5544e3029ba492aa">DELETE</a> Requests at Endpoint `'/api/v1/tours`

      ```js
      app.use(express.json());

      const tours = JSON.parse(
        fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
      );

      app.get('/api/v1/tours', (req, res) => {
        res.status(200).json({
          status: 'success',
          results: tours.length,
          data: { tours },
        });
      });

      app.post('/api/v1/tours', (req, res) => {
        const newID = tours[tours.length - 1].id + 1;
        const newTour = Object.assign({ id: newID }, req.body);
        tours.push(newTour);
        fs.writeFile(
          `${__dirname}/dev-data/data/tours-simple.json`,
          JSON.stringify(tours),
          (err) => {
            res.status(201).json({
              status: 'success',
              data: { tour: newTour },
            });
          }
        );
      });
      ```

      - In the `POST` request `req` parameter, out of the box, `express` doesn't have access to the body of the POST request so we need to use middleware `app.use(express.json())`. Middleware is a function that can modify the incoming request data. It's called middleware because it stands between the request and response. `express.json()` is the middleware that helps express app to access the request body and that data is added to the request object.
        - <img src="screenshots/simple-post-request.png" width="450">
      - <a href="https://github.com/ngannguyen117/Node.js-Bootcamp/commit/7ff03a8df314a53afc5a3ee7703167790b79bd6e">Accessing to URL Parameters</a>.
        - In the below example, we added `/:id` to the endpoint because we want to get the tour with id = 14 with this endpoint `/api/v1/tours/14`.
        - The value of `req.params` would be something like `{ id: '14' }`.
        - If there are more parameters, we can add more like `/:id/:x/:y` => `{ id: '14', x: '1', y: '2' }`, if we want to make one of the parameters optional, we can add `?` like `/:id/:x/:y?` => `{ id: '14', x: '1', y: undefined }`
        ```js
        app.get('/api/v1/tours/:id', (req, res) => {
          const id = req.params.id * 1;
          if (id > tours.length) {
            return res.status(404).json({
              status: 'fail',
              message: 'Invalid ID',
            });
          }
          const tour = tours.find((element) => element.id == id);
          res.status(200).json({
            status: 'success',
            data: { tour },
          });
        });
        ```

    - <a href="https://github.com/ngannguyen117/Node.js-Bootcamp/commit/0d76673339f0bb7b8cd63a49fe7d3580d7750ab3">Refactoring Routes</a>

      To make the routes/endpoints clearer, we create separate functions for the request handlers and then pass them into respective HTTP methods. Additionally, we can use `.route(...)` of express app to show which methods we use for different routes.

      ```js
      app.route('/api/v1/tours').get(getAllTours).post(createTour);

      app
        .route('/api/v1/tours/:id')
        .get(getTour)
        .patch(updateTour)
        .delete(deleteTour);
      ```

    - <a href="https://github.com/ngannguyen117/Node.js-Bootcamp/commit/3d1384845708948070c63ed0299bdfc07f823f38">Middleware and the Request-Response Cycle</a>

      - <img src="screenshots/request-response-cycle.png" width="800">
      - To apply a middleware to express app, we use `app.use` and pass a middleware handler in.
      - We can write our own middleware handler:
        - This handler/function has three parameters: request, response, and next. `next` is the next middleware. At the end of each handler, we always have to call `next()`, otherwise it will get stuck at the current middleware. The middleware in `app.use` will be applied to all requests below it
        - Example of a global middleware
          ```js
          app.use((req, res, next) => {
            req.requestTime = new Date().toISOString();
            next();
          });
          ```
      - Or use a 3rd-Party middleware.
        - Ex: `morgan` (`npm i morgan`)
        - => `app.use(morgan('dev'));`
        - => `GET /api/v1/tours 200 6.250 ms - 8681` - is printed in terminal

    - <a href="https://github.com/ngannguyen117/Node.js-Bootcamp/commit/3f84f36712f362f1c98bf6f9f0eabe793c9b6f49">Creating and Mounting Multiple Routers</a>

      - According to the RESTful architecture, each resource like tours or users should be an endpoint. So we'd want to create a route for each of the resources and put them in a separate file to make it easier to manage when the app gets bigger.
      - To make each resource a route, we use middleware `express.Router()`. Each of the resource now becomes a mini app having its own root
      - Once the request match the endpoint declared in `app.use(...)`, it will run the attached Router

        ```js
        const tourRouter = express.Router();

        tourRouter.route('/').get(getAllTours).post(createTour);
        tourRouter
          .route('/:id')
          .get(getTour)
          .patch(updateTour)
          .delete(deleteTour);

        app.use('/api/v1/tours', tourRouter);
        ```

    - <a href="https://github.com/ngannguyen117/Node.js-Bootcamp/commit/5ea2bd0e695bbb50b3a4eb81c81dc3205502cecc">Restructuring Files</a>

      - `server.js`: the starting file of this web app. This is where we starts the server and will include everything related to the server
      - `app.js`: will only include code related to express and global express middleware
      - 2 new folders created:
        - `routes`: to hold all the resources routers
        - `controllers`: to hold each router's handlers
      - We written an NPM script `"start": "nodemon server.js"` in `package.json` to start the Node.js app

    - <a href="https://github.com/ngannguyen117/Node.js-Bootcamp/commit/ffa6a4e674bd6bf3633fee1e1a325ded0ec5c37c">Param Middleware</a>
      - `router.param(parameterName, handler)` is a middleware that will run the handler if the request url has a param that matches the provided parameterName.
      - The signature of the handler function being passed to a param middleware:
        ```js
        (req, res, next, val) => {
          console.log(`The param value is ${val}`);
          next();
        };
        ```
      - In this commit, we created a `checkID` param handler in `tourController` to validate ID before calling the final handler. This `checkID` function is then called in `tourRoutes`'s `router.param`
