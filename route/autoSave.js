const app = require('express')
const router = app.Router()
const auth = require('../middleware/auth')
const AutoSave = require('../model/autoSave')
const { check, validationResult } = require('express-validator')

// @route POST api/authUser
// @desc  Create autosave
// @access private

router.get('/', auth, async (req, res) => {
  try {
    const autoSave = await AutoSave.findOne({ user: req.user.id })
    res.send(autoSave)
  } catch (error) {
    res.send({ msg: 'server error' })
  }
})

// @route POST api/authUser
// @desc  Create autosave
// @access private

router.post('/', auth, async (req, res) => {
  // Valid updates only
  const updates = Object.keys(req.body)
  // [ 'name', 'password' ] - depend on user input
  const allowedUpdates = [
    '_id',
    'title',
    'body',
    'timeIn',
    'timeOut',
    'privacy',
    'user',
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
  const { title, body, timeIn, timeOut, privacy } = req.body
  try {
    const autoSave = await AutoSave.findOne({
      user: req.user.id
    })

    if (!autoSave) {
      try {
        const authSave = new AutoSave({
          title,
          body,
          timeIn,
          timeOut,
          privacy,
          user: req.user.id
        })
        await authSave.save()
        return res.send(authSave)
      } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server Error' })
      }
    }

    // from above updates update from existing client updates using forEach loops
    updates.forEach(update => {
      return (autoSave[update] = req.body[update])
    })

    // save updates
    await autoSave.save(err => {
      if (err) console.log(err)
    })

    res.status(200).send(autoSave)
  } catch (err) {
    return res.status(400).send(err)
  }
})

module.exports = router
