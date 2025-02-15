import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  article: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Article" },
  ],
});

export const Tag = mongoose.model("Tag", tagSchema);
