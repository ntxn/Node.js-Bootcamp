const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  /*
    Solution 1
    - Node has to load the entire file into memory before sending it back to the browser
    - It'll take too long for a big file
  */

  fs.readFile("test-file.txt", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });

  /*
    Solution 2 - Streams
    - Problem: the readable stream is much faster than the response stream and
               this will overwhelm the response stream because it cannot handle
               all incoming data => back pressure
    - Back pressure: the response cannot send data as fast as it receives it from the file.
  */

  const readable = fs.createReadStream("test-file.txt");
  readable.on("data", (chunk) => {
    res.write(chunk);
  });
  readable.on("end", () => {
    res.end();
  });
  readable.on("error", (err) => {
    console.log(err);
    res.writeHead(500);
    res.end("File not found!");
  });

  /*
    Solution 3 - use pipe operator available to writable streams
    - It allows us to pipe the output of readable streams and write to the input of a writable stream
    - It'll handle the speed of the data coming in and the speed of data going out
    - readableSource.pipe(writableDestination)
  */
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening ...");
});
