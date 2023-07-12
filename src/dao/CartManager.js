import fs from 'fs'
import { __dirname } from '../utils.js';
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export class CartManager {
    constructor(fileName) {
        this.path = path.join(__dirname, `/files/${fileName}`);
    }


    fileExists() {
        return fs.existsSync(this.path);
    }



    async getAll() {
        try {
            if (this.fileExists()) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const carts = JSON.parse(content);
                return carts;
            } else {
                throw new Error("No es posible obtener los carritos");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    //busco id
    async getCartById(id) {
        try {
            if (this.fileExists()) {
                let data = await fs.promises.readFile(this.path, 'utf-8');
                this.carts = JSON.parse(data);
            } else {
                this.carts = [];
                throw new Error('Cant find a cart.')
            }
            const idCart = this.carts.find((cart) => cart.id === id)
            if (!idCart) {
                return console.log('ups, cant find')

            }
            return idCart
         } catch(error) {
            throw new Error (error.message) 

            }

        }

    async createCart() {
            try {
                if (this.fileExists()) {
                    const content = await fs.promises.readFile(this.path, 'utf-8');
                    const carts = JSON.parse(content)
                    let newId = uuidv4()
                    const newCart = {
                        id: newId,
                        products: []
                    }
                    carts.push(newCart)
                    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
                    return newCart
                } else {
                    throw new Error(error)
                }
            } catch (error) {
                console.log(error)
            }

        }

    async saveCarts() {
            try {
                const data = JSON.stringify(this.carts, null, 4);
                await fs.promises.writeFile(this.path, data);
                return 'cart saved'
            }
            catch (error) {
                console.log(error)
            }
        }

    }