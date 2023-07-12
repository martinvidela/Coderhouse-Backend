//--Imports
import express from 'express'
import { routerProducts } from './routes/productos.routes.js';
import { routerCarts } from './routes/carts.routes.js';
import { __dirname } from './utils.js';
import path from 'path'


const port = 8080;

//--Server App
const app = express()

//--Up
app.listen(port, () => console.log('Server listening on port ', port))

//--Middlewares
app.use(express.urlencoded({ extended: true })); // entender json de forms
app.use(express.json())
app.use(express.static(path.join(__dirname,'/public')))

//--Routes
app.use('/api/productos', routerProducts)
app.use('/api/carts', routerCarts)




