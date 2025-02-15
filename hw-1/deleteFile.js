const fs = require("fs");

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Ошибка при удалении файла");
      return;
    }
    console.log(`file ${filePath} has been deleted`);
  });
}

deleteFile("./log.txt");
