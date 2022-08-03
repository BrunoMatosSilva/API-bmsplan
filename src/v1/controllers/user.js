const User = require('../models/user')
const CryptoJS = require('crypto-js')
const jsonwebtoken = require('jsonwebtoken')

exports.register = async (req, res) => {
  const { password } = req.body
  try {
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    )

    const user = await User.create(req.body)
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '24h' }
    )
    res.status(201).json({ user, token })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email }).select('password email')
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: 'email',
            msg: 'Invalido email ou senha'
          }
        ]
      })
    }

    const decryptedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8)

    if (decryptedPass !== password) {
      return res.status(401).json({
        errors: [
          {
            param: 'email',
            msg: 'Invalido email ou senha'
          }
        ]
      })
    }

    user.password = undefined

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '24h' }
    )

    res.status(200).json({ user, token })

  } catch (err) {
    res.status(500).json(err)
  }
}