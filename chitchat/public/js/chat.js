/* eslint-disable */

const socket = io();
socket.on('message', (msg) => {
  console.log(msg);
});

const form = document.getElementById('message-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = event.target.elements.message.value;
  socket.emit('sendMessage', message, (error) => {
    if (error) return console.log(error);
    console.log('The message was delivered');
  });
});

document.getElementById('send-location').addEventListener('click', () => {
  if (!navigator.geolocation)
    return alert('Geolocation is not supported by your browser');

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      'sendLocation',
      {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      () => console.log('Location shared')
    );
  });
});
