    const axios = require('axios')
    const SpotifyToken = require('../models/spotifytoken');
    const SpotifyWebApi = require('spotify-web-api-node');

    exports.jwt = async (req, res, next) => {
        let now = new Date().getTime()
        req.token = await SpotifyToken.findOne({}).sort({$natural:-1});
        if (!req.token){
            res.redirect('http://localhost:3000/')
        } else if ( now > req.token.expires_in) {
            const refreshToken = req.token.refreshToken
            const spotifyApi = new SpotifyWebApi({
                redirectUri: "http://localhost:3000/",
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken,
            })
            spotifyApi.refreshAccessToken().then(
                (data) => {
                    console.log('Token has been refreshed!');
                    console.log('refreshed token!' + data.body['access_token']);
                    req.token.accessToken = data.body['access_token'];
                    req.token.expires_in = (new Date().getTime()) + (req.token.expires_in * 100);
                    req.token.save();
                }).catch((error) => {
                    res.status(400).json({ message: error.message })
                })
        }
        return next();
    }
    
    exports.login = (req, res, next) => {
      
        const code = req.body.code

        const spotifyApi = new SpotifyWebApi({
            redirectUri: "http://localhost:3000/",
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        })
        spotifyApi.authorizationCodeGrant(code).then(data => {
            const spotifyToken = new SpotifyToken({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expires_in: (new Date().getTime()) + (data.body.expires_in * 100),
            })
            try {
                const newSpotifyToken = spotifyToken.save()
                res.status(201).json(newSpotifyToken);
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
    }
    exports.search = async (req, res, next) => {
        let search = req.body.search
        await axios({
            method: 'GET',
            url: 'https://api.spotify.com/v1/search',
            params: {
            type: 'artist,playlist,show',
            q: search,
            limit: 5
            },
            headers: { 
            'Authorization': 'Bearer ' + req.token.accessToken,
            'Content-Type': 'application/json'
            }
        }).then(({data}) => {
            res.json(data)
        }).catch((error) => {
            console.log(error)
            res.json(error)
        })
    }