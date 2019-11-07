const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')
const routers = new express.Router()
const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')
const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')
const upload = multer(uploadConfig)

routers.get('/', (req, res) => {
  return res.send('Alive')
})

routers.get('/posts', PostController.index)
routers.post('/posts', upload.single('image'), PostController.store)
routers.post('/posts/:id/like', LikeController.store)

routers.post('/authenticate', AuthController.authenticate)
routers.get('/users', UserController.index)
routers.post('/users', UserController.store)

module.exports = routers
