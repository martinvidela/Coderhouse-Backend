import { cartModel } from "../../models/carts.model.js";

export class CartMongo {
  constructor() {
    this.model = cartModel;
  }

  fileExists() {
    return fs.existsSync(this.path);
  }

  async getAll() {
    try {
      const carts = await this.model.find();
      return carts;
    } catch (error) {
      throw error;
    }
  }

  //busco id
  async getCartById(id) {
    try {
        const findId = this.model.findById(id)
        return findId
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCart() {
    try {
      const cartCreated = await this.model.create({});
    } catch (error) {
      console.log(error);
    }
  }
}
