/* eslint-disable */

const socket = io();
socket.on('message', (msg) => {
  console.log(msg);
});

const form = document.getElementById('message-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = event.target.elements.message.value;
  socket.emit('sendMessage', message);
});
