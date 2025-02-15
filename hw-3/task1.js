const { log } = require("console");
const fs = require("fs");

setTimeout(() => {
  fs.mkdir("./myFolder", (err) => {
    if (err) {
      console.error(`Есть ошибка при создании директории :${err}`);
    } else {
      console.log("directory has been created");
    }
  });
}, 2000);

setTimeout(() => {
  fs.rmdir("./myFolder", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("directory has been deleted");
    }
  });
}, 4000);
