import mongoose from "mongoose";

//coleccion name

const cartCollection = 'carts'

//schema

const cartSchema = new mongoose.Schema({
    
    products:{
        type:[],
        default:[]
    }
    
})

export const cartModel = mongoose.model(cartCollection, cartSchema)