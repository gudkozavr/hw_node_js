const express = require("express");

const app = express();

const PORT = 3000;

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`lis ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
