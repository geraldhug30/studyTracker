const express = require('express')
const connectDB = require('./config/db')
const helmet = require('helmet')
//connect to database
connectDB()

const app = express()
const PORT = process.env.PORT || 3000
// important to parse json req
app.use(express.json({ extended: true }))
// security

app.use(function(req, res, next) {
  helmet()
  res.removeHeader('X-Powered-By')
  next()
})

app.use('/api/users', require('./route/users'))
app.use('/api/records', require('./route/record'))
app.use('/api/auth', require('./route/auth'))

app.listen(PORT, err => {
  if (err) console.log(err)
  console.log(`Server is running on port: ${PORT}`)
})
