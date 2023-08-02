import mongoose from "mongoose";


// nombre de la coleccion

const productsCollection = 'products'

//esquema de products

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    thumbnail:{
        type:String
    },
    code:{
        typeof:Number
    }

})


export const productModel = mongoose.model(productsCollection, productSchema)