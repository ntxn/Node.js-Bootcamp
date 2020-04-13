const fs = require("fs");
const crypto = require("crypto");

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("--------------------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));
});

console.log("Hello from hte top-level code");

/*
Hello from hte top-level code  <-- not in the event loop
Timer 1 finished                <-- not in the event loop
Immediate 1 finished            <-- not in the event loop
I/O finished                    <-- not in the event loop
--------------------
Immediate 2 finished            <-- why does this one get executed first?
Timer 2 finished
Timer 3 finished

The reason why setImmediate 2 is executed before timer 2 & 3 is because we're 
currently in I/O phase, and not in expired timer callbacks phase. So the 2 timers
are added to the queue but will not get processed until the event loop goes back there.
setImmediate is the phase right after I/O execuation phase, that's why it got processed first.
*/

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("--------------------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("Process.nextTick"));
});

console.log("Hello from hte top-level code");

/*
Hello from hte top-level code
Timer 1 finished
Immediate 1 finished
I/O finished
--------------------
Process.nextTick
Immediate 2 finished
Timer 2 finished
Timer 3 finished
*/

// Test thread pool.
// function from crypto will be automatically added to the thread pool by the event loop
const start = Date.now();
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("--------------------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("Process.nextTick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted")
  );
});

console.log("Hello from hte top-level code");

/*
Hello from hte top-level code
Timer 1 finished
Immediate 1 finished
I/O finished
--------------------
Process.nextTick
Immediate 2 finished
Timer 2 finished
1405 Password encrypted
Timer 3 finished
*/

// Test thread pool.
// default thread pool size is 4. So if we add 4 crypto function, it should take the same amount of time
// to process all of them
const start = Date.now();
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("--------------------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("Process.nextTick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted")
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted")
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted")
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted")
  );
});

console.log("Hello from hte top-level code");

/*
Hello from hte top-level code
Timer 1 finished
Immediate 1 finished
I/O finished
--------------------
Process.nextTick
Immediate 2 finished
Timer 2 finished
2614 Password encrypted
2614 Password encrypted
2630 Password encrypted
2634 Password encrypted
Timer 3 finished
*/

// Test thread pool.

// now we increase the pool size to see how it affects the time it processes the callback

process.env.UV_THREADPOOL_SIZE = 1;

const start = Date.now();
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("--------------------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("Process.nextTick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted")
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted")
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted")
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted")
  );
});

console.log("Hello from hte top-level code");

/*
Hello from hte top-level code
Timer 1 finished
Immediate 1 finished
I/O finished
--------------------
Process.nextTick
Immediate 2 finished
Timer 2 finished
1348 Password encrypted
2615 Password encrypted
Timer 3 finished
3947 Password encrypted
5232 Password encrypted

it takes much longer because there's only 1 thread in the thread pool, so it
processes one after the other.
*/
