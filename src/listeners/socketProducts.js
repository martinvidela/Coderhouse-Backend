import { pm } from "../dao/index.js";


export const socketProducts = (socketServer) => {
  socketServer.on("connection", async (socket) => {
    console.log("client connected");

    // Lista de productos para RealTimeP
    const listProductRealTime = await pm.getProducts();
    // Sending list
    socket.emit("listProductsReal", listProductRealTime);
    // Listening Addproduct
    socket.on("addProduct", async (product) => {
      await pm.addProduct(product);
    });
    socket.on("deleteProduct", async (id) => {
      await pm.deleteProduct(id);
    });
  });
};
