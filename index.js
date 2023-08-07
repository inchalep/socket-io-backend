const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const server = http.createServer(app);
const port = 8000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
