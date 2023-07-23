//--Imports
import express from 'express'
import { routerProducts } from './routes/productos.routes.js';
import { engine } from 'express-handlebars';
import { routerCarts } from './routes/carts.routes.js';
import { __dirname } from './utils.js';
import path from 'path'
import { Server } from 'socket.io'
import { viewRoutes } from './routes/views.routes.js';
import { ProductManager } from './dao/ProductManager.js';
const productService = new ProductManager('products.json')

const port = 8080;

//--Server App
const app = express()

//--Up
const httpServer = app.listen(port, () => console.log('Server listening on port ', port))


//--Handlebars 
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

//--Websocket
const io = new Server(httpServer)



//realTimeProducts
io.on('connection', async (socket) => {
    console.log('client connected')
    
    //lista de productos para RTP
    const listProductRealTime = await productService.getProducts()
    //sending list
    socket.emit('listProductsReal', listProductRealTime)
    //listening addproduct 
    socket.on('addProduct', async (product) => {
        await productService.addProduct(product)
    })
    //listening deleteproduct
    socket.on('deleteProduct', async (id) => {
        await productService.deleteProduct(Number(id))
    })
    
})


app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
})

//--Routes
app.use('/', viewRoutes)
app.use('/api/productos', routerProducts)
app.use('/api/carts', routerCarts)


//--Middlewares
app.use(express.urlencoded({ extended: true })); // entender json de forms
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))


