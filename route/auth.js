const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../model/Users')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

// @route   GET api/auth
// @desc    Get login user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')

    res.status(200).json(user)
  } catch (err) {
    // if (err) console.log(err)
    return
  }
})

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'please include a valid email')
      .isEmail()
      .notEmpty()
      .normalizeEmail(),
    check('password')
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage('Password must be 5 character or more!')
      .trim()
      .escape()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(403).json({ msg: errors })
    }

    const { email, password } = req.body
    try {
      // find user
      const user = await User.findOne({ email })
      if (user === null) res.status(400).json({ msg: 'Invalid Credential' })

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) res.status(400).json({ msg: 'Invalid Credential' })

      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          return res.status(200).json({ token })
        }
      )
    } catch (error) {
      res.status(500).json({ msg: 'Server error!' })
    }
  }
)

module.exports = router
