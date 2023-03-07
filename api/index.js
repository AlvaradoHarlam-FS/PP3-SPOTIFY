const express = require('express')
require('dotenv').config()

const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
require('body-parser').json()

const app = express()
app.use(cors());

const PORT = process.env.PORT || 4001;

const artistsRoutes = require('./routes/artists')
const albumsRoutes = require('./routes/albums')
const songsRoutes = require('./routes/songs')

const DATABASE = process.env.DATABASE;

mongoose.set('strictQuery', false);
mongoose.connect(DATABASE, {})
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Database Connection Established'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Is working!")
  });

app.use('/api/artists', artistsRoutes);
app.use('/api/albums', albumsRoutes);
app.use('/api/songs', songsRoutes);


app.use(express.static(path.join(__dirname, '../reactjs/build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../reactjs/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})