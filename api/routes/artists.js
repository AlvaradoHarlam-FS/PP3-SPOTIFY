const { response } = require('express');
const express = require('express');
const router = express.Router();

const Artist = require('../models/artist')

const getArtist = async (req, res, next) => {
    let artist
    try {
        artist = await Artist.findById(req.params.id)
        if (artist === null) {
            return res.status(404).json({ message: 'Artist not found' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    console.log(`Artist: ${artist}`)
    res.artist = artist;
    next();
}

router.post("/", async (req, res) => {
    const artist = new Artist({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
    });

    try {
        const newArtist = await artist.save()
        res.status(201).json(newArtist)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
  });


router.get('/:id', getArtist, async (req, res) => {
    res.json(res.artist)
});

module.exports = router;