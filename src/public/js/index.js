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



