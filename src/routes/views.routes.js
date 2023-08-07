import { ProductsMongo } from "../dao/managers/DB/productsMongo.js";

import { Router } from "express";

const router = Router();

// Productos

const productService = new ProductsMongo();

router.get("/", async (req, res) => {
  let productos = await productService.getProducts();
  res.render("home", {
    title: "Products on sale!",
    products: productos,
  });
});

export { router as viewRoutes };
