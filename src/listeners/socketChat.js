import { chatModel } from "../dao/models/chat.model.js";

const socketChat = (socketServer) => {
  socketServer.on("connection",async(socket)=>{
    console.log('new user connected')
    socket.on()
  });
}