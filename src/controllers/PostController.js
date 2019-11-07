const Post = require('./../models/Post')
const Sharp = require('sharp')
const Path = require('path')
const Fs = require('fs')

module.exports = {
  async index (req, res) {
    const posts = await Post.find().sort({ createdAt: 'desc' })
    return res.json(posts)
  },
  async store (req, res) {
    const { author, place, description, hashtags, userId } = req.body
    const { filename: image } = req.file

    const [name] = image.split('.')
    const fileName = `${name}.jpg`

    // Redimensionar as imagem salvar
    await Sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        Path.resolve(req.file.destination, 'resized', fileName)
      )

    // deletar a imagem não redimensionada
    Fs.unlinkSync(req.file.path)
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName,
      user_id: userId
    })

    // Envia a informação de um post para toda aplicação conectado a esse backend
    req.io.emit('post', post)

    return res.json(post)
  },

  async delete (req, res) {
    const { id } = req.params
    await Post.deleteOne({ _id: id }, function (err) { if (err) return err })
    return res.status(200)
  }
}
