const express = require('express');
const router = express.Router();

const spotifyCtrl = require('../controllers/spotify')


router.get('/login', spotifyCtrl.login)

router.post('/search', spotifyCtrl.jwt, spotifyCtrl.search)
 
module.exports = router;