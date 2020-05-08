const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = require('./src/app');
const {
  generateMessage,
  generateLocationMessage,
} = require('./src/utils/messages');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./src/utils/users');

const port = process.env.PORT;

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', generateMessage('Welcome!'));
    socket.broadcast
      .to(user.room)
      .emit('message', generateMessage(`${user.username} has join`));

    callback();
  });

  socket.on('sendMessage', (msg, callback) => {
    const filter = new Filter();
    if (filter.isProfane(msg)) return callback('Profanity is not allowed');

    io.to('34').emit('message', generateMessage(msg));
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
    const user = removeUser(socket.id);
    if (user)
      io.to(user.room).emit(
        'message',
        generateMessage(`${user.username} has left.`)
      );
  });
});

server.listen(port, () => console.log(`Server is up on port ${port}`));
