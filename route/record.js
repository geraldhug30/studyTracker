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
    const { title, body, timeIn, timeOut } = req.body

    try {
      const records = new Records({
        title,
        body,
        timeIn,
        timeOut,
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
  '/:id',
  [
    auth,
    check('title', 'Title is required')
      .notEmpty()
      .trim()
      .escape(),
    check('body', 'Please Enter Body Context')
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
    const allowedUpdates = ['title', 'body', 'timeIn', 'timeOut']
    //return boolean check update to allowedUpdates using include
    const isValidUpdates = updates.every(update =>
      allowedUpdates.includes(update)
    )
    if (!isValidUpdates) {
      return res.status(400).send({ msg: 'error updates' })
    }
    // update start
    try {
      const records = await Records.findOne({
        _id: req.params.id,
        users: req.user._id
      })

      if (!records) {
        return res.status(500).send('error')
      }

      // from above updates update from existing client updates using forEach loops
      updates.forEach(update => (records[update] = req.body[update]))
      // save updates
      await records.save()

      res.status(200).send(records)
    } catch (err) {
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
