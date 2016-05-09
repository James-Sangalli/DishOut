var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 8080
var passport = require('passport')
var Strategy = require('passport-facebook').Strategy;

var session = require('express-session')

// required for passport
app.use(session({
  secret: 'ssshhhhhh! Top secret!', // process.env.SESSION_SECRET
  saveUninitialized: true,
  resave: true
}))
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session
// remove commented code

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
// move views into project root 
app.use(express.static(__dirname + '/public'))
// this suggest all your views are static resources 
// localhost:3000/views/index.pug

require("./routes/index.js")(app,passport)

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port + '\n')
})
