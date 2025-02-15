import mongoose from "mongoose";

const magazineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  issueNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});
