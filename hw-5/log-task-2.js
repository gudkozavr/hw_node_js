const http = require("http");
const fs = require("fs");

const PORT = 3000;

const server = http.createServer((req, res) => {
  try {
    fs.read("./test.txt", "utf8", () => {
      console.log("файл был прочитан(его не существует)");
    });
  } catch (err) {
    fs.appendFile("./err.log", err.toString(), () => {
      console.log("err has been written in err.log");
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Interval server error");
    });
  }
});

server.listen(PORT, "localhost", (err) => {
  err ? console.log(err) : console.log(`listening ${PORT}`);
});
