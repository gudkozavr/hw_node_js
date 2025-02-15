import express from "express";
import bcrypt from "bcrypt";
import "dotenv/config";
import { MongoClient } from "mongodb";
import mustChangePassword from "./config/middlewares/mustChangePassword.js";
import { ObjectId } from "mongodb";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI);

let db = null;
let usersCollection = null;
async function connectDB() {
  try {
    await client.connect();
    db = client.db("hw8_auth");
    usersCollection = db.collection("users");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

connectDB();
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      mustChangePassword: true,
    };

    await usersCollection.insertOne(newUser);
    res.status(200).json({ message: "user registered successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post(
  "/login",
  async (req, res, next) => {
    const { email, password } = req.body;
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Invalid password" });
    }
    if (!user.mustChangePassword) {
      res
        .status(200)
        .json({ message: `welcome to home page ${user.username}` });
    }

    req.user = user;
    next();
  },
  mustChangePassword
);

app.get("/change-password/:id", (req, res) => {
  try {
    res.status(200).json({ message: "please chance password" });
  } catch (error) {
    res.status(500).json({ error: "" });
  }
});
app.post("/change-password/:id", async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = await usersCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log(user.password, password, isPasswordValid);

    if (isPasswordValid) {
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      const changedUser = {
        password: newHashedPassword,
        mustChangePassword: false,
      };
      await usersCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        {
          $set: changedUser,
        }
      );
      return res.status(200).json({ message: "password updated successfully" });
    } else {
      return res.status(400).json({ message: "invalid credential" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
});

app.post("/delete-account", async (res, req) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
