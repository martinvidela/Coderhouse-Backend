import { pm } from "../dao/index.js";

import { Router } from "express";

const router = Router();

// Productos

router.get("/", async (req, res) => {
  let productos = await pm.getProducts();
  res.render("home", {});
});

router.get("/products", async (req, res) => {
  try {
    const { stock, limit = 10, page = 1, sort = "asc" } = req.query;
    const stockValue = stock === 0 ? undefined : parseInt(stock);
    if (!["asc", "desc"].includes(sort)) {
      return res.render("products", { error: "orden no valido" });
    }
    const sortValue = sort === "asc" ? 1 : -1;
    let query = {};
    if (stockValue) {
      query = { stock: { $gte: stockValue } };
    }
    let productos = await pm.getWithPaginate(query, {
      page,
      limit,
      sort: { price: sortValue },
    });
    console.log(productos);
    res.render("products", {
      title: "Products on sale!",
      products: productos,
    });
  } catch (error) {
    res.render('products', {error:'Error!'})
  }
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

router.get("/support", async (req, res) => {
  res.render("support");
});
export { router as viewRoutes };
