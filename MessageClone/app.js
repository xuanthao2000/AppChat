import express from 'express';
import path from 'path';
import http from 'http';
import {Server} from 'socket.io';

const port = 3000;
const app = express();
const server = http.createServer(app)
//io la 1 web socket instance nam tren server
const io = new Server(server);

const __dirname = path.resolve();


app.use('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('on-chat', data => {
        io.emit('user-chat', data)
    })
})

server.listen(port, () => console.log(`Listening at http://localhost:${port}`));