const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log('Connected to database')
  } catch (error) {
    if (error) {
      console.log(error)
      process.exit(1)
    }
  }
}

module.exports = connectDB
