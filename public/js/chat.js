const socket = io();

const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");

socket.on('message', (message) => {
    console.log(message);
});

document.querySelector("#message-form").addEventListener('submit',(e) => {
  e.preventDefault();

  $messageFormButton.setAttribute('disabled', 'disabled');
  const message = document.querySelector("input").value;

  socket.emit("sendMessage", message, (err) => {
    $messageFormButton.removeAttribute('disabled');
    $messageFormInput.value = '';
    $messageFormInput.focus();
    if (err) {
     return console.log(err);
    }
    console.log("The message was delivered!");
  });
  
});

$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('geolocation is not supported by your browser!');
  }

  $sendLocationButton.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);

    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, () => {
      $sendLocationButton.removeAttribute('disabled');
      console.log('Location Shared!');
    })
  });
});

// socket.on("countUpdated", (count) => {
//     console.log('The count has been updated!', count);
// });

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('clicked');

//     socket.emit('increment');
// });