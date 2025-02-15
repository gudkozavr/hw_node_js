const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "PUT") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("PUT-запрос обработан");
  } else if (req.method === "DELETE") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("DELETE запрос");
  }
});

server.listen(3000, "localhost", (error) => {
  error ? console.log(error) : console.log("listening 3000");
});
