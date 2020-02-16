const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Records = require('../model/Records')
const { check, validationResult, sanitizeBody } = require('express-validator')
//Crud

// @route GET api/records
// @desc  Get Records
// @access Private

router.get('/', auth, async (req, res) => {
  try {
    const records = await Records.find({ user: req.user.id }).sort({
      date: -1
    })
    if (!records) res.send('No record Found')

    res.json(records)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

// @route GET api/records/:id
// @desc  Get Specific Records
// @access Private

router.get('/:id', auth, async (req, res) => {
  try {
    const records = await Records.findOne({ _id: req.params.id })
    if (!records) res.send('No record Found')

    res.json(records)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

// @route POST api/records
// @desc  Create Records
// @access Private

router.post(
  '/',
  [
    auth,
    check('title', 'Title is required')
      .notEmpty()
      .trim(),
    check('body', 'Please Enter Body Context').notEmpty(),
    check('timeIn', 'Require TimeIn').notEmpty(),
    check('timeOut', 'Require TimeOut').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { title, body, timeIn, timeOut, duration } = req.body

    try {
      const records = new Records({
        title,
        body,
        timeIn,
        timeOut,
        duration,
        user: req.user.id
      })
      await records.save()
      return res.send(records)
    } catch (error) {
      res.status(500).json({ msg: 'Server Error' })
    }
  }
)

// @route PUT api/records
// @desc  Edit Records
// @access Private

//id should be the record id in params /:id not user id
router.put(
  '/',
  [
    auth,
    check('title', 'Title is required')
      .notEmpty()
      .trim()
      .escape(),
    check('timeIn', 'Require TimeIn').notEmpty(),
    check('timeOut', 'Require TimeOut').notEmpty()
  ],
  async (req, res) => {
    // Valid updates only
    const updates = Object.keys(req.body)
    // [ 'name', 'password' ] - depend on user input
    const allowedUpdates = [
      '_id',
      'title',
      'body',
      'timeIn',
      'timeOut',
      'duration',
      'user',
      'date',
      '__v'
    ]
    //return boolean check update to allowedUpdates using include
    const isValidUpdates = updates.every(update =>
      allowedUpdates.includes(update)
    )
    if (!isValidUpdates) {
      console.log('validation error')
      return res.status(400).send({ msg: 'error updates' })
    }
    // update start

    try {
      const records = await Records.findOne({
        _id: req.body._id,
        user: req.user.id
      })

      if (!records) {
        console.log(records)
        return res.status(500).send('error')
      }

      // from above updates update from existing client updates using forEach loops
      updates.forEach(update => {
        return (records[update] = req.body[update])
      })
      console.log(records)
      // save updates
      await records.save(err => {
        console.log(err)
      })

      res.status(200).send(records)
    } catch (err) {
      console.log(err)
      return res.status(400).send(err)
    }
  }
)

// @route DELETE api/records
// @desc  Delete Records
// @access Private
// record id needed direct delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id
    await Records.findByIdAndDelete(id)
    res.send('deleted')
  } catch (error) {
    res.status(500).send('server error')
  }
})

module.exports = router
