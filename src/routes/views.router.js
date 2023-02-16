// por ahora vacio
import { Router } from "express"
import ProductManager from "../managers/ProductManager.js"
import { Server } from "socket.io"
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
    const products = await manager.getProducts();
    res.render('realTimeProducts', {
        user: testUser,
        isAdmin: testUser.role === 'admin',
        products,
        style: 'style.css'
    });
})

router.get('/register', (req, res) => {
    res.render('register')
})

export default (io) => {
    io.on('connection', (socket) => {
        console.log(`Socket ${socket.id} connected.`)

        socket.on('addProduct', async (data) => {
            await manager.addProduct(data.title, data.price, data.thumbnail);
            const products = await manager.getProducts();
            io.emit('productListUpdated', { products })
        })

        socket.on('deleteProduct', async (id) => {
            await manager.deleteProduct(id);
            const products = await manager.getProducts();
            io.emit('productListUpdated', { products })
        })

        socket.on('disconnect', () => {
            console.log(`Socket ${socket.id} disconnected.`)
        })
    })

    return router;
}





