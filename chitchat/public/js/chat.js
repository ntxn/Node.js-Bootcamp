/* eslint-disable */

const socket = io();

// DOM Elements
const $messageForm = document.getElementById('message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.getElementById('send-location');
const $messages = document.getElementById('messages');

// Templates
const messageTemplate = document.getElementById('message-template').innerHTML;
const locationMessageTemplate = document.getElementById(
  'location-message-template'
).innerHTML;

socket.on('message', ({ message, createdAt }) => {
  const html = Mustache.render(messageTemplate, {
    message,
    createdAt: moment(createdAt).format('h:mm a'),
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', ({ url, createdAt }) => {
  const html = Mustache.render(locationMessageTemplate, {
    url,
    createdAt: moment(createdAt).format('h:mm a'),
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  $messageFormButton.setAttribute('disabled', 'disabled');

  const message = event.target.elements.message.value;
  socket.emit('sendMessage', message, (error) => {
    // reset form
    $messageFormButton.removeAttribute('disabled');
    $messageFormInput.value = '';
    $messageFormInput.focus();

    if (error) return console.log(error);
    console.log('The message was delivered');
  });
});

$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation)
    return alert('Geolocation is not supported by your browser');

  $sendLocationButton.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      'sendLocation',
      {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      () => {
        $sendLocationButton.removeAttribute('disabled');
        console.log('Location shared');
      }
    );
  });
});
