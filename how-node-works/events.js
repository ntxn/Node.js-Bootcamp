// To use the built-in Node events, we need to import the events core module
const EventEmitter = require("events"); // standard name for requiring events module
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super(); // to inherits all methods from the parent class
  }
}

// create a new emitter
const myEmitter = new Sales();

// These two ON method is the event listeners. They wait for an event called newSale to happen to execute the callback function
myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Jonas");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});

// emit method is the event emitter. It emits an event called newSale
myEmitter.emit("newSale", 9);

/*
Output:

There was a new sale
Customer name: Jonas
There are now 9 items left in stock
*/

/*------------------------------------------------------*/
const server = http.createServer();
server.on("request", (req, res) => {
  console.log("Request Received");
  res.end("Request Recevied");
});
server.on("request", (req, res) => {
  console.log("Another Request");
});
server.on("close", () => {
  console.log("Server close");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for request ...");
});
