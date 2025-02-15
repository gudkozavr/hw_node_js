import app from "./app.js";
import "dotenv/config";
import { connectDb } from "./config/db.js";
const PORT = process.env.PORT;

connectDb();
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
