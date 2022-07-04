const path = require("path");
const http = require("http");
const express = require("express");

const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicPath = path.join(__dirname, "/public");
app.use(express.static(publicPath));

// let count = 0;

io.on("connection", (socket) => {
    console.log("new websocket connection!");
    // socket.emit('countUpdated', count);
  socket.emit('message', 'Welcome!');
  socket.broadcast.emit('message', 'A new user has added!');

    socket.on("sendMessage", (message) => {
      io.emit("message", message);
    });
  
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left!');
  });

    // socket.on('increment', () => {
    //     // count++;
    //     // // socket.emit("countUpdated", count);
    //     // io.emit("countUpdated", count);
    // });
});

server.listen(3000, () => {
  console.log("server is started at port 3000");
});
