
//--Imports
import express from 'express'
import { ProductManager } from './dao/ProductManager.js';
import { routerProducts } from './routes/productos.routes.js';
import { routerCarts } from './routes/carts.routes.js';
import { __dirname } from './utils.js';
import path from 'path'


const port = 8080;

//--Server App
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'/public')))

//--Routes
app.use('/api/productos', routerProducts)
app.use('/api/carts', routerCarts)


//--Up
app.listen(port, () => console.log('Server listening on port ', port))

//--Class
const productService = new ProductManager('./productos.json')


//--Routes
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