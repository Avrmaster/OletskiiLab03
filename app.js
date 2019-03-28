const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')

const app = express()
const MongoStore = require('connect-mongo')(session)

//connect to MongoDB
mongoose.connect('mongodb://oleksandr:qwerty1@ds361085.mlab.com:61085/oletskii3')
const db = mongoose.connection

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  // we're connected!
  console.log('successfully connected to mongo db')
})

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db,
  }),
}))

// parse incoming requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// serve static files from template
app.use(express.static(__dirname + '/public'))

// include routes
const routes = require('./routes/router')
app.use('/', routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('File Not Found')
  err.status = 404
  next(err)
})

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.send(err.message)
})

// listen on port 3000
app.listen(3000, function() {
  console.log('Express app listening on port 3000')
})
