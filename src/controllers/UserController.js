const User = require('../models/User')
module.exports = {
  async index (req, res) {
    const users = await User.find()
    return res.json(users)
  },
  async store (req, res) {
    const { email, password } = req.body
    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({ email, password })
    }

    return res.json(user)
  }
}
