const express = require('express');



const router = express.Router();


router.get('/', getSongs)


router.get('/:id', getSong)


router.post('/', createSong)


router.delete('/:id', deleteSong)


router.patch('/:id', updateSong)

module.exports = router

