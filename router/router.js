const {postMeme, getMeme, updateMeme, getMemeById} = require('../controller/controller')
const express = require('express')
const router = express.Router()

router.get('/memes', getMeme)
router.get('/memes/:id', getMemeById)
router.post('/memes', postMeme)
router.put('/memes/:id', updateMeme)

module.exports = router

