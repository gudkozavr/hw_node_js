import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("main page");
});

app.use((_req, res, _next) => {
  res.status(404).send("404: Page Not Found");
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
