import { Router } from "express";
import { ProductManager } from "../dao/ProductManager.js";

const router = Router()

//-- Class
const productService = new ProductManager('productos.json')

// -- Validar datos (middleware)
const validateFields = (req, res, next) => {
    const productInfo = req.body
    if (!productInfo.title || !productInfo.description || !productInfo.code || !productInfo.price || !productInfo.stock)
        return res.json({ status: 'error', message: "Incomplete fields" })
    else {
        next()
    }
}


router.get('/', async (req, res) => {
    let show = 0;
    try {
        const productos = await productService.getProducts()
        const limit = parseInt(req.query.limit)
        if (limit > 0) {
            show = productos.filter(prod => prod.id <= limit)
        } else {
            show = productos
        }
        res.json({status: 'success', data:show})
    } catch (error) {
        res.json({status: 'error', message:error.message})
    }
})

router.get('/:pid', (req, res) => {

    try {
        const prodId = parseInt(req.params.pid)
        const resultado = productService.getProductById(prodId)
        if (!resultado) {
            res.send('El producto no existe')
        } else {
            res.send(resultado)
        }

    } catch (error) {
        res.send('El producto no existe')

    }
})


router.post('/', validateFields, async (req, res) => {
    
        const productoInfo = req.body
        const newProduct = await productService.addProduct(productoInfo)
        res.json({status:'success', data:newProduct, message:'New product added!'})


})

router.put('/:pid', async (req, res) => {
    try {
        const prodId = parseInt(req.params.pid)
        const productInfo = req.body
        const update = await productService.updateProduct(prodId, productInfo)
        res.json({status:'success', data:update, message:'product updated'})

    } catch (error) {
        
    }

})


router.delete('/:pid', async (req, res) => {
    const prodId = parseInt(req.params.pid)
    const deleteId = await productService.deleteProduct(prodId)
    res.json({status:"success", data:deleteId, message:"product deleted"})

})

export { router as routerProducts }