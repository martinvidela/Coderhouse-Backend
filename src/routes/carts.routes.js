import { Router } from "express";
import { CartManager } from "../dao/CartManager.js";
import { ProductManager } from "../dao/ProductManager.js";

const router = Router()

const cartService = new CartManager('carts.json')
const productService = new ProductManager('productos.json')


router.post('/', async (req, res) => {
    try {
        const cartCreated = await cartService.createCart()
        res.json({ status: 'success', data: cartCreated })
    } catch (error) {
        res.json({ status: 'error', message: error.message })
    }

})

router.get('/:cid', (req, res) => {
    const cartId = req.params.cid
    const result = cartService.getCartById(cartId)
    res.send(result)


})

router.post('/:cid/productos/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const prodId = req.params.pid
        let cart = await cartService.getCartById(cartId)
        let product = await productService.getProductById(prodId)
        let products = cart.products;
        let prodIsInCart = cart.products.find((p) => p.id === prodId)
        if (prodIsInCart) {
            let index = products.findIndex((p) => p.id === prodId)
            cart.products[index].quantity++;
            cartService.saveCarts()
            res.json({ status: 'success', data: cart })
        } else {
           const newProduct = {
                id: prodId,
                quantity: 1
            }
            cart.products.push(newProduct)
            cartService.saveCarts()
            res.json({ status: 'success', data: cart })

        }

    } catch (error) {
        console.error(error.message);
        res.json({ status: "error", message: error.message });
    }

})

export { router as routerCarts }