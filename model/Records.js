const mongoose = require('mongoose')

const RecordSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
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
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('records', RecordSchema)
