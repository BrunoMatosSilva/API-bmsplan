const router = require('express').Router({mergeParams: true})
const { param } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')
const sectionController = require('../controllers/section')

router.post(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Id invalido')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.create
)

router.put(
  '/:sectionId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Id invalido do Projeto')
    } else return Promise.resolve()
  }),
  param('sectionId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Id invalido da Lista')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.update
)

router.delete(
  '/:sectionId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Id invalido do Projeto')
    } else return Promise.resolve()
  }),
  param('sectionId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Id invalido da Lista')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.delete
)

module.exports = router