const mongoose = require('mongoose')

const AutoSave = mongoose.Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  timeIn: {
    type: String,
    strict: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})

module.exports = mongoose.model('autoSave', AutoSave)
