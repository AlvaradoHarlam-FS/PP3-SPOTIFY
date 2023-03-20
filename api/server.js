const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors())
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const PORT = 3000;

const DATABASE_URL = process.env.DATABASE_URL;

// mongoose server
mongoose.connect(DATABASE_URL, { useNewURLParser: true })
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Database connection established'))

// routes
const loginRouter = require('./routes/AuthRoute');
app.use('/', loginRouter)



// server running
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})