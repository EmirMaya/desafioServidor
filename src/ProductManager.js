// const fs = require('fs');
import fs from 'fs'
class ProductManager {
    constructor(path) { //el array products vacio 
        this.path = path
        this.products = []; //array vacio de productos donde traemos el .json
        this.lastId = 0; //id que inicio en 0 
        this.init();
    }

    async init() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.lastId = this.products.length ? this.products[this.products.length - 1].id : 0; //esta linea no me quedó claro
        } catch (err) {
            console.error(err);
        }
    }

    getProducts = () => {
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

// const manager = new ProductManager('products.json');
// // console.log(manager.getProductById(1));
// // manager.deleteProduct(1);
// manager.addProduct({ title: 'Product 1', description: 'Product 1 description', price: 9.99, thumbnail: 'image.jpg', code: 'abc123', stock: 10 });
// manager.updateProduct(1, {title: 'Product 2'});
