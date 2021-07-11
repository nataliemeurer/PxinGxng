const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'packages', 'react-app', 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'packages', 'react-app', 'build', 'index.html'));
});

app.listen(9000);

console.log("Listening on port :9000.");
