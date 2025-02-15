const EventEmitter = require("events");

const msgEmitter = new EventEmitter();

msgEmitter.on("message", (args) => {
  const { userName, message } = args;
  console.log(`${userName}: ${message}`);
});

function sendMessage(userName, message, emitter) {
  emitter.emit("message", { userName: userName, message: message });
}

sendMessage("Alice", "Hi", msgEmitter);
sendMessage("Alice", "How are you?", msgEmitter);
sendMessage("Bob", "Hi, good! Thanks.", msgEmitter);
