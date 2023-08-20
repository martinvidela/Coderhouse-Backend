import mongoose from "mongoose";

const chatCollection = "chatMessages";

const messageSchema = new mongoose.Schema(
  {
    user: String,
    message: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const chatModel = mongoose.model(chatCollection, messageSchema);
