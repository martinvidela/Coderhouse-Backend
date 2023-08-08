import { Router } from "express";
import { ProductsMongo } from "../dao/managers/DB/productsMongo.js";
const router = Router();

//-- Class
const productService = new ProductsMongo();

router.get("/", async (req, res) => {
  let show = 0;
  try {
    const productos = await productService.getProducts();
    const limit = parseInt(req.query.limit);
    if (limit > 0) {
      show = productos.filter((prod) => prod.id <= limit);
    } else {
      show = productos;
    }
    console.log(productos);
    res.json({ status: "success", data: productos });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.get("/:pid", (req, res) => {
  try {
    const prodId = parseInt(req.params.pid);
    const resultado = productService.getProductById(prodId);
    if (!resultado) {
      res.send("El producto no existe");
    } else {
      res.send(resultado);
    }
  } catch (error) {
    res.send("El producto no existe");
  }
});

router.post("/", async (req, res) => {
  try {
    const productoInfo = req.body;
    console.log('Producto recibido ', req.body)
    const productCreated = await productService.addProduct(productoInfo);
    console.log(productCreated);
    res.json({
      status: "success",
      data: productCreated,
      message: "New product added!",
    });
  } catch (error) {}
});

router.put("/:pid", async (req, res) => {
  try {
    const prodId = parseInt(req.params.pid);
    const productInfo = req.body;
    const update = await productService.updateProduct(prodId, productInfo);
    res.json({ status: "success", data: update, message: "product updated" });
  } catch (error) {}
});

router.delete("/:pid", async (req, res) => {
  const prodId = parseInt(req.params.pid);
  const deleteId = await productService.deleteProduct(prodId);
  res.json({ status: "success", data: deleteId, message: "product deleted" });
});

export { router as routerProducts };
