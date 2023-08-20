import { chatManager } from "../dao/managers/DB/chatMongo..js";
const chatMongo = new chatManager();

export const socketChat = (socketServer) => {
  socketServer.on("connection", async (socket) => {
    socket.broadcast.emit("newUser", "New user connected");
    console.log("New user chat connected");
    socket.on("mensaje", async (data) => {
      await chatMongo.createMessage(data);
      socketServer.emit("chat", await chatMongo.getMessages());
    });
    socket.on("clearchat", async () => {
      await chatMongo.deleteAllMessages();
      socket.emit("chatCleared");
    });
  });
};
