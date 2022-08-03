const router = require('express').Router({mergeParams: true})
const { param, body } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')
const taskController = require('../controllers/task')

router.post(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Id do projeto invalido')
    } else return Promise.resolve()
  }),
  body('sectionId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Id da lista invalida')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.create
)

router.put(
  '/update-position',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Id do projeto invalido')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.updatePosition
)

router.delete(
  '/:taskId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Id do projeto invalido')
    } else return Promise.resolve()
  }),
  param('taskId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Id da tarefa invalido')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.delete
)

router.put(
  '/:taskId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Id do projeto invalido')
    } else return Promise.resolve()
  }),
  param('taskId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Id da tarefa invalido')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.update
)

module.exports = router