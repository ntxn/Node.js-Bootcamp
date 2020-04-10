This depository contains projects and notes from my node.js bootcamp

- Node Farm - Project

  - Read/write files synchronously and asynchronously with module `fs`
  - Create a web server, routing, API, handle requests using module `http`
  - Create query object from url parameters using module `url`
  - Use `npm` as project manager and install other 3rd party modules

- Back-End Web Development - Notes
  - How the Web Works:
    - <img src="screenshots/client-server-model.png" width="400">
    - When we enter a web address to the browser, the browser send a request to the DNS (Domain Name System). This DNS server then lookup the website address to find its real IP address. This happens through ISP (Internet Service Provider)
    - <img src="screenshots/dns-lookup.png" width="250"> <img src="screenshots/dns-lookup-result.png" width="245">
    - <img src="screenshots/web-address-breakdown1.png" width="265"> <img src="screenshots/web-address-breakdown2.png" width="300">
    - Port number: identify a specific service running on a server (a sub-address). Port number has nothing to do with the resources that we want to access. That resource will be sent over in the http requests
    - Once we have the real web ID addresses, a TCP/IP socket connection is established between the browser and the server. This connection is kept alive until the browser get all the files from the response
      - <img src="screenshots/tcpipsocket.png" width="400">
      - TCP/IP is a communication protocol defined how data is transfered across the web.
      - TCP breaks up the requests/responses into thousand of small chucks called packages before they are sent by IP. Once they arrive at the destination, TCP reassembles the packages into the original request/response. TCP wants to make sure the message travels as fast as possible.
      - IP's job is to send and route the packages to its destination through the internet. IP ensures the packages arrives where they're supposed to based on each package's IP address
    - After having the TCP/IP socket connection, the browser send a http request to the server
      - <img src="screenshots/http-request.png" width="600">
      - HTTP are communication protocol defined how clients and servers talk to each other. Here, the clients send a request and the server return a response
    - Once the server done process the request, it'll send back a http reponse
      - It is the developer that set up what to send back like the headers `res.writeHeader` and the body `res.end`. The body usually contains the html of the website requested or json coming back from an API
      - <img src="screenshots/http-response.png" width="600">
    - When a client requests a website, there are actually a lot of requests
      - <img src="screenshots/initial-web-requests.png" width="300">
