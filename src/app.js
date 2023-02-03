
import express from 'express'
import __dirname from './utils.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const PORT = 8080;

app.use(express.json());
// app.use(express.urlencoded({extended:true})) //para que el reqparamsid lo tome directamente
app.use(express.static(__dirname + '/public'));
console.log(__dirname); //esto sin el utils con lo que copie en internet no me funcionaba

// http://localhost:8080/api/productos
app.use('/api/productos', productsRouter)

// http://localhost:8080/api/carts
app.use('/api/carts', cartsRouter)

app.listen(PORT, err => {
    if (err) console.log(err)
    console.log(`Listening on PORT ${PORT}`);
})

