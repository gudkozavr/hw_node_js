const fs = require("fs");

function logMessage(message) {
  fs.appendFile("log.txt", message, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

module.exports = logMessage;
