// por ahora vacio
import { Router } from "express"
import ProductManager from "../managers/ProductManager.js"
const manager = new ProductManager('./src/db/products.json');
const router = Router()

router.get('/', async (req, res) => {
    let testUser = {
        name: 'Emir',
        last_name: 'Maya',
        role: 'admin',
    }

    const products = await manager.getProducts();

    res.render('index', {
        user: testUser,
        isAdmin: testUser.role === 'admin',
        products,
        style: 'style.css'
    })
})

router.get('/realtimeproducts', async (req, res) => {
    let testUser = {
        name: 'Emir',
        last_name: 'Maya',
        role: 'admin',
    }
    const products = await manager.getProducts();
    res.render('realTimeProducts', {
        user: testUser,
        isAdmin: testUser.role === 'admin',
        products,
        style: 'style.css'
    });
})


 

export default router