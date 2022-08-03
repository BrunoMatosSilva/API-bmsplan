const router = require('express').Router()
const userController = require('../controllers/user')
const { body } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')
const User = require('../models/user')

router.post('/signup',
body('name').isLength({ min: 3 }).withMessage(
  'o nome deve ter pelo menos 3 caracteres'
),
body('email').matches(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).withMessage(
  'o e-mail é obrigatorio'
),
body('password').isLength({ min: 8 }).withMessage(
  'a senha deve ter pelo menos 8 caracteres'
),
body('confirmPassword').isLength({ min: 8 }).withMessage(
  'a confirmação de senha deve ter pelo menos 8 caracteres'
),
 body('email').custom(value => {
  return User.findOne({email: value}).then(user => {
    if (user){
      return Promise.reject('esse email já existe!')
    }
  })
}),
validation.validate,
userController.register
)

router.post('/login',
body('email').matches(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).withMessage(
  'o e-mail é obrigatorio'
),
body('password').isLength({ min: 8 }).withMessage(
  'a senha deve ter pelo menos 8 caracteres'
),
validation.validate,
userController.login
)

router.post(
  '/verify-token',
  tokenHandler.verifyToken,
  (req, res) => {
    res.status(200).json({ user: req.user })
  }
)

module.exports = router