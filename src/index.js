import express from 'express'
import { ProductManager } from './ProductManager.js';



const port = 8080;

//creamos app del sv
const app = express()


//levantar sv
app.listen(port, () => { console.log('Server listening on port ', port) })

//instancia de la class
const productService = new ProductManager('./productos.json')

//productos
app.get('/productos', async (req, res) => {
    let show = 0;

    try {
        const productos = await productService.getProducts()
        const limit = parseInt(req.query.limit)
        if (limit > 0) {
            show = productos.filter(prod => prod.id <= limit)
        } else {
            show = productos
        }
        res.send(show)
    } catch (error) {
        res.send(error.message)
        console.log(error)
    }


})

//product/id
app.get('/productos/:pid', (req, res) => {

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