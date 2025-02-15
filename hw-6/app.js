import sequelize from "./config/bd.js";
import Product from "./models/Poduct.js";
import express from "express";

import path from "path";

const app = express();
app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Соединение с базой данных успешно установлено.");
  } catch (error) {
    console.error("Ошибка соединения с базой данных:", error);
  }
})();

app.get("/", (req, res, next) => {
  try {
    res.sendFile(path.resolve("./views", "home.html"));
  } catch (error) {
    next(error);
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    console.log(products);

    res.status(200).send({ products, message: "all products" });
  } catch (error) {}
});

app.get("/error", (req, res, next) => {
  const error = new Error("Ошибка на /error");
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).send({
    message: "Произошла ошибка на сервере. Попробуйте снова позже.",
    error: err.message,
  });
});
// app.use((req, res) => {
//   res
//     .status(404)
//     .send("Страница не найдена. Пожалуйста, проверьте правильность пути.");
// });

app.post("/products", async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res
        .status(400)
        .json({ error: "Все поля (name, price) обязательны." });
    }
    const newProduct = await Product.create({ name, price });

    res.status(201).json({
      message: "Продукт успешно добавлен.",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/", (req, res) => {
  const data = req.body;

  res.status(200).json({
    message: "ответ успешно отправлен",
    data: req.data,
  });
  console.log("setting data: ", data);
});

app.listen(3000, () => {
  console.log("post listening 3000");
});
