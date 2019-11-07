const Post = require('./../models/Post')

module.exports = {
  async store (req, res) {
    const { id } = req.params
    const post = await Post.findById(id)
    post.likes += 1
    await post.save()

    // Envia a informação de um post para todos usuários conectado a esse backend
    req.io.emit('like', post)

    return res.json(post)
  }
}
