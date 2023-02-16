// const fs = require('fs');
import fs from 'fs'
class ProductManager {
    constructor(path) { //el array products vacio 
        this.path = path
        this.products = []; //array vacio de productos donde traemos el .json
        this.lastId = 0; //id que inicio en 0 
        this.init();
    }
//BASICAMENTE SON IDENTICOS CON CARTMANAGER
    async init() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.lastId = this.products.length ? this.products[this.products.length - 1].id : 0; 
        } catch (err) {
            console.error(err);
        }
    }

    getProducts =  () => {
        return this.products;
    }

    save = async () => {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }

    addProduct = async (product) => {
        try {
            product.id = ++this.lastId;// sube el id
            this.products.push(product); //guardo en el array
            await this.save(); //escribo en  json
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) => {
        try {
            this.products = this.products.filter(product => product.id !== id);
            await this.save();
          
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = (id) => {
        return this.products.find(product => product.id === id);
    }

    updateProduct = async (id, product) => {
        try {
            const index = this.products.findIndex(p => p.id === id);
            if (index === -1) return;
            this.products[index] = { ...this.products[index], ...product };
            await this.save();
        } catch (error) {
            console.log(error);
        }
    }
}

export default ProductManager


