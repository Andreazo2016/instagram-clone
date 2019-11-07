const express = require('express')
const Path = require('path')
const app = express()
const Cors = require('cors')

const routers = require('./router')

const mongoose = require('mongoose')

// node suporte requisições http
const server = require('http').Server(app)

// node suporte requisições websocket
const io = require('socket.io')(server)

mongoose.connect('mongodb+srv://omnistack-user-db:omnistack@cluster0-ndiry.mongodb.net/desafioanigerbd?retryWrites=true&w=majority', {
  useNewUrlParser: true
})
// Fazer com que todos as rotas da aplicação tenha acesso ao websocket
app.use((req, res, next) => {
  req.io = io
  next()
})
app.use(express.json())
app.use(Cors())
app.use('/files', express.static(Path.resolve(__dirname, '..', 'uploads', 'resized')))
app.use(routers)

server.listen(3333)
