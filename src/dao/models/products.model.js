import mongoose from "mongoose";
const { Schema } = mongoose;

// nombre de la coleccion

const productsCollection = "products";

//esquema de products

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: Number,
  stock: Number,
  category: String,
});

export const ProductModel = mongoose.model(productsCollection, productSchema);
