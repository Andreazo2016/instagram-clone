const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
  async authenticate (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('password')

    if (!user) return res.status(400).json({ err: 'User not found' })

    if (!await bcrypt.compare(password, user.password)) return res.status(400).json({ err: 'Invalid password' })

    user.password = undefined

    return res.json(user)
  }

}
