import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
// nombre de la coleccion

const productsCollection = "products";

//esquema de products

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  code: { type: String },
  stock: { type: Number, required:true },
  category: { type: String, required:true, enum: ["Gaming", "Office"] },
});


productSchema.plugin(mongoosePaginate)
export const ProductModel = mongoose.model(productsCollection, productSchema);
