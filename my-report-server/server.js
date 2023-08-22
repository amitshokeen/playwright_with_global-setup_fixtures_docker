const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    //const indexHtml = fs.readFileSync("../pw-narratives-qa/playwright-report/index.html");
    let indexHtml = fs.readFileSync("./report/index.html");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(indexHtml);
  } else {
    res.statusCode = 404;
    res.end("File not found.");
  }
});

server.listen(8080);

console.log("Server is listening on port 8080");
