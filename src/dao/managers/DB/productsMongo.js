import { ProductModel } from "../../models/products.model.js";

export class ProductsMongo {
  constructor() {
    this.model = ProductModel;
  }

  getProducts = async () => {
    try {
      const products = await this.model.find().lean();
      console.log(products);
      return products;
    } catch (error) {
      console.log(error.message);
    }
  };

  addProduct = async(productInfo)=> {
    try {
      const productCreated = await this.model.create(productInfo);
      return productCreated;
    } catch (error) {
      console.log(error.message);
    }
  }

  getProductById = async (id) => {
    try {
      const product = await this.model.findById(id);
      return product;
    } catch (error) {
      console.log(error.message);
    }
  };

  deleteProduct = async (id) => {
    try {
      const productDeleted = await this.model.findByIdAndDelete(id);
      if (productDeleted) {
        return "Product deleted.";
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

/* updateProduct = async (id, product) => {
  try {
    return await productsModel.findByIdAndUpdate(id, { $set: product });
  } catch (err) {
    return err;
  }
};
 */
