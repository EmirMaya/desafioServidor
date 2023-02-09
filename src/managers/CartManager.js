import fs from 'fs'
class CartManager {
    constructor(path) { //el array carts vacio 
        this.path = path
        this.carts = []; //array vacio de productos donde traemos el .json
        this.lastId = 0; //id que inicio en 0 
        this.init();
    }

    async init() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8'); //traigo la db
            this.carts = JSON.parse(data); //cambio a js
            this.lastId = this.carts.length ? this.carts[this.carts.length - 1].id : 0; //vamos aumentando el id
        } catch (err) {
            console.error(err);
        }
    }

    save = async () => {
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2)); //guarda en json
    }

    getCartById = (id) => {
        return this.carts.find(cart => cart.id === id); //busca en el array carts el id
    }

    updateCart = async (id, cart) => {
        try {
            const index = this.carts.findIndex(c => c.id === id); //encuentra el id del carro
            if (index === -1) return 'not found'; //no encuentra el carro ya que la posicion es 0, no hay nada
            this.carts[index] = { ...this.carts[index], ...cart }; //si no si lo hace y agrega lo nuevo con spread op
            await this.save(); //escribo el file
        } catch (error) {
            console.log(error);
        }
    }

    addCart = async (cart) => {
        try {
            cart.id = ++this.lastId;// sube el id
            this.carts.push(cart); //guardo en el array
            await this.save(); //escribo en  json
        } catch (error) {
            console.log(error);
        }
    }
}

export default CartManager