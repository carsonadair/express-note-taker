const express = require('express');
const notesRouter = require('./noteRoute');
const app = express();

app.use('/notes', notesRouter);

module.exports = app;