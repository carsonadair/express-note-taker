const express = require('express');
const path = require('path');
const api = require('./routes/homeRoute.js');
const app = express();

const PORT = process.env.PORT || 3002;

// This is the middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));


// This is the GET route
app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

// This is the GET route to notes
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });


// This returns to the main page
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});