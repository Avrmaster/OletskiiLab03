const express = require('express')
const router = express.Router()
const User = require('../models/user')

const nodemailer = require('nodemailer').createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'leskivforoletskii3@gmail.com',
    pass: 'oletskiiSuperHero1',
  },
})

// GET route for reading data
router.get('/', function(req, res, next) {
  User.find().exec(function(err, data) {
    if (err)
      return callback(err)
    return res.render('index', { title: 'User dashboard', data: data })
  })
})

router.get('/emails', function(req, res) {
  return res.render('emails', { title: 'Emails sending' })
})

router.post('/sendEmails', function(req, res) {

  User.find().exec(function(err, data) {
    if (err)
      return callback(err)
    data.forEach(function(item) {
      const mailOptions = {
        from: 'leskivforoletskii3@gmail.com',
        to: item['email'],
        subject: 'Rossilka from Oletskii project',
        text: req.body.msg,
      }

      nodemailer.sendMail(mailOptions, function(error, info) {
        if (error)
          console.error(error)
        else
          console.log('Email sent: ' + info.response)
      })

    })
  })

  res.redirect('/')
})

//POST route for updating data
router.post('/', function(req, res, next) {

  let userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  }

  User.create(userData, function(error, user) {
    if (error) {
      return next(error)
    } else {
      return res.redirect('/')
    }
  })
})

module.exports = router
