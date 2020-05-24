const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/my-portfolio'));

// PathLocationStrategy
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/my-portfolio/index.html'))
})

app.listen(process.env.PORT || 8080);

console.log('Console Listening!');

