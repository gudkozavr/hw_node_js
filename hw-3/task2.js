const fs = require("fs");

fs.writeFile("./info.txt", "Node.js is awesome!", (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("file has been created");
  }
});

fs.writeFile("./info.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`data from info.txt ${data}`);
  }
});
