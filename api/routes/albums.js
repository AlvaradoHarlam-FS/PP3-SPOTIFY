const router = require("express").Router();

const Album = require("../models/album");


// GET all albums
router.get("/", async (req, res) => {
  return res.json("getting all albums")
});


module.exports = router;