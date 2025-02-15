import express from "express";
import cors from "cors";
import "dotenv/config";
import Book from "./models/Book.js";
import sequelize from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("main page");
});
app.get("/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "books not found" });
  }
});

app.post("/books", async (req, res) => {
  try {
    const newBook = req.body;
    await Book.create(newBook);
    res.status(201).json({ message: "New book has been " });
  } catch (error) {
    res.status(500).json({ error: "book not created, error server" });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const newBookData = req.body;
    await Book.update(newBookData, { where: { id: bookId } });
    res.status(201).json({ message: "Book has been updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
app.delete("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    await Book.destroy({ where: { id: bookId } });
    res.status(201).json({ message: "Book has been deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use((_req, res, _next) => {
  res.status(404).send("404: Page Not Found");
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to DB has been established");
    console.log(`server listening on port ${PORT}`);
  } catch (error) {
    console.log("error occurred while connecting to DB: ", error);
  }
});
