const express = require(`express`);
const dbData = require(`./db/db.json`);
const uuid = require(`./helper/uuid`)

const app = express();
const PORT = 3001

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`public`));

app.get('/public/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/public/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

app.get('/api/notes', (req, res) => res.json(dbData));


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);