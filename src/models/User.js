const Mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new Mongoose.Schema({
  email: String,
  password: String
})

UserSchema.pre('save', async function (next) {
  const user = this
  await bcrypt.hash(user.password, 10).then(function (hash) {
    user.password = hash
    next()
  })
})

module.exports = Mongoose.model('User', UserSchema)
