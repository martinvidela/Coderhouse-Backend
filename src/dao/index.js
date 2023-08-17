import { ProductsMongo } from "./managers/DB/productsMongo.js";
import { CartMongo } from "./managers/DB/cartMongo.js";
import { connectDB } from "../config/dbConnection.js";



//persistencia de mongoDB

connectDB()
export const cartMongo = new CartMongo()
export const pm = new ProductsMongo()
