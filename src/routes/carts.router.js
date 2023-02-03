import { Router } from "express";
import CartManager from "../CartManager.js";
import ProductManager from "../ProductManager.js";
const cartManager = new CartManager('./src/carts.json')
const prodManager = new ProductManager('./src/products.json');
const router = Router()


router.post('/', async (req, res) => {
    // try {
    //     const { products } = req.body;
    //     const newCart = { products };
    //     await cartManager.addCart(newCart);
    //     res.status(201).send({ message: 'Cart created successfully' });
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send({ message: 'Error creating cart' });
    // }
///CUAL ES MEJOR DE LOS 2 METODOS PARA ESTE POST?
    try {
        const cart = req.body; //recibo lo escribo en el body postman o tc
        await cartManager.addCart(cart);// lo agrego al file
        res.status(201).send({ message: 'Cart created successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Error creating cart' });
    }
});

//
router.get('/:cid', (req, res) => { //DEBE LLEVAR ASYNC??
    try {
        const cid = parseInt(req.params.cid); //id del cart
        const cart =  cartManager.getCartById(cid); //encuentro el cart en el file
        if (!cart) { //si no esta, avisamos
            res.status(404).send({ error: 'Cart not found' });
            return;
        }
        res.status(200).send({ products: cart.products });//mostramos el carro
    } catch (err) {
        res.status(500).send({ error: 'Error getting cart' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => { 
    try {
        const cid = parseInt(req.params.cid); //id cart
        const pid = parseInt(req.params.pid); // id prod
        const cart = cartManager.getCartById(cid); //buscamos el cart por id
        if (!cart) { //si no esta se avisa
            return res.status(404).send({ message: 'Cart not found' });
        }
        const product = prodManager.getProductById(pid); // buscamos prod por id
        if (!product) { // si no lo encuentra avisa
            return res.status(404).send({ message: 'Product not found' });
        }
        let existingProduct = cart.products.find(p => p.product === pid); //lo buscamos en el array del cart
        if (existingProduct) { //si esta le aumentamos quantity
            existingProduct.quantity++;
        } else { //si no quantity inicia en 1
            cart.products.push({ product: pid, quantity: 1 });
        }
        await cartManager.updateCart(cid, cart); //actualizamos
        return res.send({message: `updated ${cart}`});
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error adding product to cart' });
    }
});


export default router