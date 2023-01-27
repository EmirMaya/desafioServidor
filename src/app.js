
import express from 'express'
import ProductManager from './ProductManager.js';
// import productManager from './ProductManager.js'
// const ProductManager = require('./ProductManager.js');
const manager = new ProductManager('./src/products.json');
const app = express()
const PORT = 8080

app.use(express.json())


app.get('/products/:id', (req, res) => {
    let id = Number(req.params.id)
    const product = manager.getProductById(id)

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await manager.getProducts(limit)
        res.status(200).json({ products });
    } catch (err) {
        res.status(500).send('Error getting products');
    }
});



app.listen(PORT, err => {
    if (err) console.log(err)
    console.log(`Listening on PORT ${PORT}`);
})