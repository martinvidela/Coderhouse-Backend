//--Imports
import express from 'express'
import { routerProducts } from './routes/productos.routes.js';
import { engine } from 'express-handlebars';
import { routerCarts } from './routes/carts.routes.js';
import { __dirname } from './utils.js';
import path from 'path'
import { Server } from 'socket.io'
import { viewRoutes } from './routes/views.routes.js';


const port = 8080;

//--Server App
const app = express()

//--Up
app.listen(port, () => console.log('Server listening on port ', port))

//--Middlewares
app.use(express.urlencoded({ extended: true })); // entender json de forms
app.use(express.json())
app.use(express.static(path.join(__dirname,'/public')))

//--Handlebars config
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

//--Routes
app.use('/', viewRoutes)
app.use('/api/productos', routerProducts)
app.use('/api/carts', routerCarts)




