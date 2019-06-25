const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const databaseConfig = require('../src/config/database')

mongoose.connect(databaseConfig, {
    useNewUrlParser: true
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, *");
    req.io = io
    next();
})
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads','resized')))
app.use(require('./routes'))
app.use(cors())
server.listen(3333)
