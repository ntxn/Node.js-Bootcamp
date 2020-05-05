const http = require("http");

const url =
  "http://api.weatherstack.com/current?access_key=1934f9e34594c0322433b9e5f0e3ad7b&query=45,-75";

const request = http.request(url, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data += chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log("ERROR", error);
});

request.end();
