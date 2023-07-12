import { __dirname } from '../utils.js';
import path from 'path'

export class CartManager {
    constructor(fileName) {
        this.products = [];
        this.path = path.join(__dirname, `/files/${fileName}`);
    }
}
