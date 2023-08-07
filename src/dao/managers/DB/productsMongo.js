import { ProductModel } from "../../models/products.model.js";

export class ProductsMongo {
  constructor() {
    this.model = ProductModel;
  }

  async getProducts() {
    try {
      const products = await this.model.find();
      console.log(products);
      return products;
    } catch (error) {
      console.log(error.message);
    }
  }

  async addProduct(productInfo) {
    try {
      const productCreated = await this.model.create(productInfo);
      return productCreated;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getProductById(id) {
    try {
      const product = await this.model.findById(id);
      return product;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteProduct(id) {
    try {
      const product = await this.model.deleteOne(id);
      return product;
    } catch (error) {
      console.log(error.message);
    }
  }
}
