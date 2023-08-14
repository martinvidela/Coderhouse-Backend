//--Imports
import express from "express";
import { routerProducts } from "./routes/products.routes.js";
import { engine } from "express-handlebars";
import { routerCarts } from "./routes/carts.routes.js";
import { __dirname } from "./utils.js";
import path from "path";
import { Server } from "socket.io";
import { viewRoutes } from "./routes/views.routes.js";
import { config } from "./config/config.js";
import { connectDB } from "./config/dbConnection.js";
import { ProductsMongo } from "./dao/managers/DB/productsMongo.js";
import { chatModel } from "./dao/models/chat.model.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Handlebars from "handlebars";

const port = config.server.port;

//--Server App
const app = express();

//!--DataBase
connectDB();
//!--Middlewares
app.use(express.urlencoded({ extended: true })); // entender json de forms
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

//--Express Server
const httpServer = app.listen(port, () =>
  console.log("Server listening on port ", port)
);
//--Websocket Server
const io = new Server(httpServer);

//*--Handlebars
app.engine(".hbs", engine({extname:".hbs"}));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));

const productService = new ProductsMongo();

//*---------------  realTimeProducts --------------
io.on("connection", async (socket) => {
  console.log("client connected");

  // Lista de productos para RealTimeP
  const listProductRealTime = await productService.getProducts();
  // Sending list
  socket.emit("listProductsReal", listProductRealTime);
  // Listening Addproduct
  socket.on("addProduct", async (product) => {
    await productService.addProduct(product);
  });
  socket.on("deleteProduct", async (id) => {
    await productService.deleteProduct(id);
  });
  //*---------------  realTimeProducts --------------
  //*---------------  CHAT SUPPORT -------------------

  socket.on("authenticated", async (msg) => {
    const messages = await chatModel.find();
    socket.emit("messageHistory", messages);
    socket.broadcast.emit("newUser", msg);
  });

  socket.on("message", async (data) => {
    console.log("data", data);
    const messageCreated = await chatModel.create(data);
    const messages = await chatModel.find();
    io.emit("messageHistory", messages);
  });
});
//*--------------- CHAT SUPPORT -------------------
app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});
//--Routes
app.use("/", viewRoutes);
app.use("/support", viewRoutes);
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
