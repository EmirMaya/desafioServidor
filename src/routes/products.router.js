import { Router } from "express";
import ProductManager from '../managers/ProductManager.js';
const manager = new ProductManager('./src/db/products.json');

const router = Router()

// GET api/productos /
router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await manager.getProducts(limit) //ACA ME MARCA ALGO EN EL AWAIT, QUE NO TIENE EFECTO ??
        res.status(200).json({ products });
    } catch (err) {
        res.status(500).send('Error getting products');
    }
});

// GET api/productos/:id
router.get('/:id', async (req, res) => { //DEBE LLEVAR ASYNC?
    const id = Number(req.params.id)
    const product = await manager.getProductById(id)
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

router.post('/', async (req, res) => {
    try {
        //ES BUENA PRACTICA QUE ESTEN TODOS LOS PARAMS? O SE PUEDE PONER UN OBJ ACÁ?
        const { title, description, code, price, stock, category, thumbnails = [] } = req.body; //lo que le paso por postman/tc
        const status = true;
        const product = { title, description, code, price, status, stock, category, thumbnails };
        await manager.addProduct(product); //agrego el prod
        res.status(201).json({ message: 'Product created' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Could not create product' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id) //id
        const productToUpdate = req.body; 
        const updatedProduct = await manager.updateProduct(id, productToUpdate);//actualizo
        res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        res.status(500).send({ message: 'Error updating product', error });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)
        await manager.deleteProduct(id); //actualizo
        res.status(200).send({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).send({ message: `Error+ ${error}` })
    }
})


export default router
