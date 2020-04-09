Notes during this project

- In node.js, use `require(...)` to import a module. Ex: `const fs = require('fs');` to import File System module

- <a href="https://github.com/ngannguyen117/Node.js-Bootcamp/commit/d67b8f1efa545b51dde4118c3b6293ec03b5a4b5">SYNCHRONOUS</a>

  - `fs.readFileSync` reading files synchoronously meaning before the program moves to the next line, it has to finish reading this file first
  - Read & write files synchoronously using fs module
  - Synchronous doesn't work well with Node.js because Node.js is single-threaded so if it waits for a line of code to be done before working on anything else, the rest of the code will be blocked and the program will be very slow.

- <a href="https://github.com/ngannguyen117/Node.js-Bootcamp/commit/90f702a19f18d17f1138661f9fc0f0d6e2e8c5a4">ASYNCHORONOUS</a>

  - In asynchronous code, the heavy work of that single line will be done in the background while the rest of the code will still be running. Once it is done, the call back function that was registered before will be executed. This way, that line will not block anything
  - `fs.readFile` and `fs.writeFile` reads/writes files asynchronously

- Simple Web Server
  - `const http = require('http');` - module that gives networking capability such as building a http server by calling `http.createServer(....)`
  - `createServer` takes a callback function that run everytime the server receive a request
  - For the server to receive request, the server has to listen and wait for requests, i.e. `server.listen(...)`
