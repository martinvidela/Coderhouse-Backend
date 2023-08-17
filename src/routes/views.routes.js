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
    const { stock, limit = 10, page = 1, sort = "asc", category } = req.query;
    const stockValue = stock === 0 ? undefined : parseInt(stock);
    if (!["asc", "desc"].includes(sort)) {
      return res.render("products", { error: "orden no valido" });
    }
    const sortValue = sort === "asc" ? 1 : -1;
    let query = {};
    if (stockValue) {
      query = { stock: { $gte: stockValue } };
    }
    if (category === "Office" || category === "Gaming") {
      query.category = category;
    }
    let productos = await pm.getWithPaginate(query, {
      page,
      limit,
      sort: { price: sortValue },
      lean: true,
    });
    console.log(productos);
    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

    const resultProductsView = {
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      haxNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `${baseUrl}?page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `${baseUrl}?page=${result.nextPage}`
        : null,
    };
    res.render("products", resultProductsView);
  } catch (error) {
    res.render("products", { error: "Error!" });
  }
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

router.get("/support", async (req, res) => {
  res.render("support");
});
export { router as viewRoutes };
