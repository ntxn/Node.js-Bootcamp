const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = require('./src/app');
const {
  generateMessage,
  generateLocationMessage,
} = require('./src/utils/messages');

const port = process.env.PORT;

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.emit('message', generateMessage('Welcome!'));
  socket.broadcast.emit('message', generateMessage('A new user has join'));

  socket.on('sendMessage', (msg, callback) => {
    const filter = new Filter();
    if (filter.isProfane(msg)) return callback('Profanity is not allowed');

    io.emit('message', generateMessage(msg));
    callback();
  });

  socket.on('sendLocation', ({ lat, lng }, callback) => {
    io.emit(
      'locationMessage',
      generateLocationMessage(`https://www.google.com/maps?q=${lat},${lng}`)
    );
    callback();
  });

  socket.on('disconnect', () => {
    io.emit('message', generateMessage('A new has left'));
  });
});

server.listen(port, () => console.log(`Server is up on port ${port}`));
