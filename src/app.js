import cookieParser from 'cookie-parser';
import express from 'express'
import __dirname from './utils.js';
import ProductManager from './managers/ProductManager.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
// handlebars_______________________________________________________________
import handlebars from 'express-handlebars';
//uploader__________________________________________________________________
import uploader from './utils/multerConfig.js';
// socket io _______________________________________________________________
import { Server } from 'socket.io';
//___________________________________________
const manager = new ProductManager('./src/db/products.json');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true })) //para que el reqparamsid lo tome directamente
app.use('/virtual', express.static(__dirname + '/public'));
app.use(cookieParser());
console.log(__dirname);

// handlebars_______________________________________________________________
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

// http://localhost:8080/api/productos
app.use('/api/products', productsRouter)

// http://localhost:8080/api/carts
app.use('/api/carts', cartsRouter)




// app.listen(PORT, err => {
//     if (err) console.log(err)
//     console.log(`Listening on PORT ${PORT}`);
// });



app.post('/single', uploader.single('myfile'), (req, res) => {
    res.status(200).json({
        mensaje: 'se a subido con éxito el archivo'
    })
});

const httpServer = app.listen(PORT, err => {
    if (err) console.log(err)
    console.log(`Listening on PORT: ${httpServer.address().port}`)
});


app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Todo mal');
});

const io = new Server(httpServer)

io.on('connection', socket => {
    console.log('new connection', socket.id);

    socket.on('mensaje', data => {
        console.log(data)

    });

    socket.on("createProduct", async (data) => {
        const { title, description, price, stock, code } = data;
        const product = await manager.addProduct({ title, description, price, stock, code });
        io.emit("productData", await manager.getProducts());
    });

    socket.on("deleteProduct", async (id) => {
        await manager.deleteProduct(Number(id));
        io.emit("productData", await manager.getProducts());
    });


    socket.on('disconnect', () => {
        console.log('disconnect', socket.id);
    });
});