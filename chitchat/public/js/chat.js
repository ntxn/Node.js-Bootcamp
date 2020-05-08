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
const sidebarTemplate = document.getElementById('sidebar-template').innerHTML;

// Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const autoscroll = () => {
  // New message element
  const $newMessage = $messages.lastElementChild;

  // Height of the new message
  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  // Visible height
  const visibleHeight = $messages.offsetHeight;

  // Height of messages container
  const containerHeight = $messages.scrollHeight;

  // How far how I scrolled?
  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset)
    $messages.scrollTop = $messages.scrollHeight;
};

socket.on('message', ({ username, message, createdAt }) => {
  const html = Mustache.render(messageTemplate, {
    username,
    message,
    createdAt: moment(createdAt).format('h:mm a'),
  });
  $messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});

socket.on('locationMessage', ({ username, url, createdAt }) => {
  const html = Mustache.render(locationMessageTemplate, {
    username,
    url,
    createdAt: moment(createdAt).format('h:mm a'),
  });
  $messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});

socket.on('roomData', ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });
  document.getElementById('sidebar').innerHTML = html;
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

socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = '/';
  }
});
