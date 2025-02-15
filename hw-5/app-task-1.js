const http = require("http");

const PORT = 3000;
const server = http.createServer((req, res) => {
  const autHeader = req.headers["authorization"];
  if (!autHeader) {
    res.statusCode = 401;
    res.setHeader("Content-Type", "text/plain");
    res.end("Unauthorized");
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Authorized");
  }
});

server.listen(PORT, "localhost", (err) => {
  err ? console.log(err) : console.log(`listening ${PORT}`);
});
