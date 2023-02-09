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


//ESTE APP.POST COMO PUEDO HACERLO EN VIEWS USANDO SOCKET??
//YA QUE ASÍ APP.JS QUEDA MUY DESPROLIJO 
app.post('/realtimeproducts', async (req, res) => {
    const product = req.body;
    try { 
        await manager.addProduct(product); //agrego el prod
        res.status(201).json({ message: 'Product created' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Could not create product' });
    }
    app.io.emit('product created', product);

    res.send('Product created');
});

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
        // persisti 
    });

    // socket.emit('mensajeServer', 'Listo estoy escuchandote');

    // socket.broadcast.emit('evetno_para_todos_menos_el_actual', 'Esto lo van a recibir todos lo conectados.');

    // io.emit('evento_para_todos', 'algun tipo de mensjae');

    socket.on('disconnect', () => {
        console.log('disconnect', socket.id);
    });
});
