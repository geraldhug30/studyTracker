const express = require('express')
const router = express.Router()
const User = require('../model/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const { check, validationResult } = require('express-validator')

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    // check name
    check('name', 'name is required')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    // username must be an email
    check('email', 'Please insert a valid email address')
      .isEmail()
      .notEmpty()
      .normalizeEmail(),
    // password must be at least 5 chars long
    check('password')
      .trim()
      .escape()
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long')
      .matches(/\d/)
      .withMessage('must contain a number')
      .notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors })
    }
    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(401).json({ msg: 'Users is already exists' })
      }

      user = new User({
        name,
        email,
        password
      })
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save(err => {
        if (err) console.log(err)
      })

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
      if (error) console.log(error)
      return res.status(500).json({ msg: 'Server Error' })
    }
  }
)

module.exports = router
