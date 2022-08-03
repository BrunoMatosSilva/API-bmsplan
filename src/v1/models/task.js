const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { schemaOptions } = require('./modelOptions')

const taskSchema = new Schema({
  section: {
    type: Schema.Types.ObjectId,
    ref: 'Section',
    required: true
  },
  title: {
    type: String,
    default: 'Sem titulo',
  },
  content: {
    type: String,
    default:'Sem descrição mas podemos criar'
  },
  position: {
    type: Number,
  }
}, schemaOptions)

module.exports = mongoose.model('Task', taskSchema)