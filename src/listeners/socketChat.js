import { chatModel } from "../dao/models/chat.model.js";

export const socketChat = (socketServer) => {
  socketServer.on("connection", async (socket) => {
    socket.on("authenticated", async (msg) => {
      const messages = await chatModel.find();
      socket.emit("messageHistory", messages);
      socket.broadcast.emit("newUser", msg);
    });
  });
  socketServer.on("message", async (data) => {
    console.log("data", data);
    const messageCreated = await chatModel.create(data);
    const messages = await chatModel.find();
    io.emit("messageHistory", messages);
  });
};

