const https = require('https')
const cors = require('cors')
const express = require('express')
const app = express()
const router = require('./router/router')
const port = process.env.PORT || 8080
app.use(cors())
app.use(express.json())
app.use('/', router)

app.listen(port, ()=>{
    console.log("Server started at ", port)
})