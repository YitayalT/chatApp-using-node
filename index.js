const path = require("path");
const http = require("http");
const express = require("express");

const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicPath = path.join(__dirname, "/public");
app.use(express.static(publicPath));
io.on("connection", () => {
  console.log("new websocket connection!");
});

server.listen(3000, () => {
  console.log("server is started at port 3000");
});
