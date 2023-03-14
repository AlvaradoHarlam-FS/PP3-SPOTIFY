const mongoose = require('mongoose');

const SpotifyTokenSchema = new mongoose.Schema({
    accessToken: {
        type: String
    },
    refreshToken: {
        type: String
    },
    expires_in: {
        type: Number
    }
})

module.exports = mongoose.model('SpotifyToken', SpotifyTokenSchema)