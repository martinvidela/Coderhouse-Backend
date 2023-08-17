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
import { socketChat } from "./listeners/socketChat.js";
import { socketProducts } from "./listeners/socketProducts.js";

const port = config.server.port;

//--Server App
const app = express();

//!--Middlewares
app.use(express.urlencoded({ extended: true })); // entender json de forms
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

//--Express Server
const httpServer = app.listen(port, () =>
  console.log("Server listening on port ", port)
);

//*--Handlebars
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));

//--Routes
app.use("/", viewRoutes);
app.use("/products", viewRoutes);
app.use("/support", viewRoutes);
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

const socketServer = new Server(httpServer);

socketChat(socketServer);
socketProducts(socketServer);
