// const { Socket } = require("socket.io")


console.log('soy index de public')
const socket = io()

socket.emit('mensaje', '¡Hola este es un mensaje del cliente!')


// escuchando al server 
socket.on('mensajeServer', data => {
    console.log(data)
})

socket.on('evetno_para_todos_menos_el_actual', data => {
    console.log(data)
})

socket.on('evento_para_todos', data => {
    console.log(data)
})



// document.querySelector("#productForm").addEventListener("submit", function(event) {
//     event.preventDefault();

//     const product = {
//         title: document.querySelector("#title").value,
//         description: document.querySelector("#description").value,
//         code: document.querySelector("#code").value,
//         price: document.querySelector("#price").value,
//         stock: document.querySelector("#stock").value,
//         category: document.querySelector("#category").value
//     };



//     socket.emit("createProduct", product);
// });

// document.querySelector("#deleteForm").addEventListener("submit", function(event) {
//     event.preventDefault();

//     const id = document.querySelector("#deleteId").value;

//     socket.emit("deleteProduct", id);
// });



socket.on('productListUpdate', (products) => {
    const productList = document.querySelector('#products');
    productList.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('li');
        productItem.textContent = `${product.title} - ${product.price}`;
        const deleteForm = document.createElement('form');
        deleteForm.classList.add('delete-form');
        deleteForm.method = 'POST';
        deleteForm.action = '/api/products/delete';
        const idInput = document.createElement('input');
        idInput.type = 'hidden';
        idInput.name = 'id';
        idInput.value = product.id;
        const deleteButton = document.createElement('button');
        deleteButton.type = 'submit';
        deleteButton.textContent = 'Delete';
        deleteForm.appendChild(idInput);
        deleteForm.appendChild(deleteButton);
        productItem.appendChild(deleteForm);
        productList.appendChild(productItem);
    });
});

const createForm = document.querySelector('.create-form');
createForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = createForm.querySelector('input[name="title"]').value;
    const price = createForm.querySelector('input[name="price"]').value;
    socket.emit('createProduct', { title, price });
    createForm.reset();
});

const deleteForms = document.querySelectorAll('.delete-form');
deleteForms.forEach((deleteForm) => {
    deleteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = deleteForm.querySelector('input[name="id"]').value;
        socket.emit('deleteProduct', id);
    });
});