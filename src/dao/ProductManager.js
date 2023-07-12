import fs from 'fs'
import { __dirname } from '../utils.js';
import path from 'path'

export class ProductManager {
    constructor(fileName) {
        this.products = [];
        this.path = path.join(__dirname, `/files/${fileName}`);
        this.loadProducts();


    }

    //cargo los productos
    async loadProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            if (data) {
                this.products = JSON.parse(data)
            }
        } catch (error) {
            console.log(error)

        }
    }

    //guardo los productos
    async saveProducts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
        } catch (error) {
            console.log(error)
        }
    }

    //retorno productos
    getProducts() {
        return this.products;

    }

    //busco id
    getProductById(id) {
        const idProducto = this.products.find((p) => p.id === id)
        if (!idProducto) {
            return console.log('PRODUCTO NO ENCONTRADO')

        }
        return idProducto

    }

    //agrego productos
    addProduct({ title, description, price, thumbnail, code, stock }) {
        //ultimo id
        let newId;
        if (!this.products.length) {
            newId = 1
        } else {
            newId = this.products[this.products.length - 1].id + 1
        }
        const newProduct = {
            id: newId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        //evaluo que no se repita code
        const verificoCode = this.products.some((codigo) => codigo.code === code)
        if (!verificoCode) {
            this.products.push(newProduct)
            console.log('Producto agregado con exito!', newProduct)

        } else {
            console.log('Code INVALIDO (este codigo ya fue usado)')
        }
        this.saveProducts()
    }



    updateProduct(id, updateFields) {
        const productIndex = this.products.findIndex((p) => p.id === id)
        if (productIndex === -1) {
            console.error('No se ha encontrado un id')
            return
        } else {
            console.log('Producto encontrado!')
        }

        const updatedProduct = { ...this.products[productIndex], ...updateFields }
        this.products[productIndex] = updatedProduct
        this.saveProducts()

    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((p) => p.id === id)
        if (productIndex === -1) {
            console.log('No se ha encontrado un producto')
            return;
        }

        this.products.splice(productIndex, 1)
        this.saveProducts()

    }



}



// #######################################################################################

// PRUEBAS

// Ejemplo de uso de la clase ProductManager
/*  const manager = new ProductManager("./productos.json");




 //Agregar tres productos utilizando el método addProduct

let product = {
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 99.9,
    thumbnail: "thumbnail1.jpg",
    code: "PRD001",
    stock: 10,
}
manager.addProduct(product)


product = {
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 199.9,
    thumbnail: "thumbnail2.jpg",
    code: "PRD002",
    stock: 5,
}
manager.addProduct(product);

product = {
    title: "Producto 3",
    description: "Descripción del producto 3",
    price: 249.99,
    thumbnail: "thumbnail3.jpg",
    code: "PRD003",
    stock: 15,
};

manager.addProduct(product)

// Obtener todos los productos utilizando el método getProducts
 console.log("Todos los productos:", manager.getProducts()); */

 // Obtener un producto por su ID utilizando el método getProductById
//console.log("--------------Producto con ID 2:", manager.getProductById(2));

// Buscar un producto que no existe
//console.log("--------------Producto con ID 3:", manager.getProductById(4));

