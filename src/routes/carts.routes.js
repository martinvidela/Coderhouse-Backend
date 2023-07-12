import { Router } from "express";
import { CartManager } from "../dao/Carts.js";


const router = Router()

const cartService = new CartManager('carts.json')



export {router as routerCarts}