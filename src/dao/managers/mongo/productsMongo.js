import { productModel } from '../../models/products.model.js'


export class productsMongo {
    constructor() {
        this.model = productModel
    }

    async getProducts() {
        try {

           const products = await this.model.find()
            return products
        } catch (error) {
            console.log(error.message)
        }
    }


    async addProduct(productInfo) {
        try {

           const productCreated = await this.model.create(productInfo)
            return productCreated
        } catch (error) {
            console.log(error.message)
        }
    }

    

    async getProductById(id) { 
        try {

           const product = await this.model.findById(id)
            return product
        } catch (error) {
            console.log(error.message)
        }
    }



}