const http = require('http');
const socketio = require('socket.io');
const app = require('./src/app');

const port = process.env.PORT;

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.emit('message', 'Welcome to our chatroom');
  socket.on('sendMessage', (msg) => {
    io.emit('message', msg);
  });
});

server.listen(port, () => console.log(`Server is up on port ${port}`));
