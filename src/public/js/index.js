// const { Socket } = require("socket.io")


console.log('soy index de public')
const socket = io()

socket.emit('mensaje', '¡Hola este es un mensaje del cliente!')


// escuchando al server 
socket.on('mensajeServer',  data =>{
    console.log(data)
})

socket.on('evetno_para_todos_menos_el_actual', data =>{
    console.log(data)
})

socket.on('evento_para_todos',data =>{
    console.log(data)
})



document.querySelector("#productForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const product = {
        title: document.querySelector("#title").value,
        description: document.querySelector("#description").value,
        code: document.querySelector("#code").value,
        price: document.querySelector("#price").value,
        stock: document.querySelector("#stock").value,
        category: document.querySelector("#category").value
    };
    
  

    socket.emit("createProduct", product);
});

document.querySelector("#deleteForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.querySelector("#deleteId").value;

    socket.emit("deleteProduct", id);
});