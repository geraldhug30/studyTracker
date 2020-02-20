const mongoose = require('mongoose')

const AutoSave = mongoose.Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  timeIn: {
    type: String
  },
  timeOut: {
    type: String
  },
  privacy: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})

module.exports = mongoose.model('autoSave', AutoSave)
