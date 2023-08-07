const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path')

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/screen', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Event handler for new socket connections
io.on('connection', (socket) => {
  console.log('New client connected');

  // Event handler for disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Event handler for custom message event from the client
  socket.on('message', (data) => {
    console.log('Received message from client:', data);

    // Broadcast the message to all connected clients (excluding the sender)
    socket.broadcast.emit('message', data);
  });
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

