const express = require('express');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
app.use(cors());

//server oluşturdum
const server = http.createServer(app);

//io oluşturdum
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});


io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('room', (data) => {
        socket.join(data)
    })

    socket.on('message', (data) => {
        socket.to(data.room).emit('messageReturn', data)
    })


})

const PORT = 3000;

server.listen(PORT, () => {
    console.log('server çalışır durumda')
})