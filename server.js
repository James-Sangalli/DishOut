var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 8080
var db = require(*)db

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')
app.set('views', __dirname + '/public/views')

app.use(express.static(__dirname + '/public'))

// STRANGER go to DISHOUT homepage
app.get('/', function(req, res){
  console.log('/')
  console.log('STRANGER to DISHOUT landing page (with login/signup)')

  res.render('stranger_show')
})

// redirect STRANGER go to DISHOUT homepage
app.get('/home', function(req, res){
  console.log('/home')
  console.log("redirecting to '/' which is the landing page")
  res.redirect('/')
})

// // USER go to users homepage
// app.get('/user/:id', function(req, res){
//   console.log("USER go to users homepage: ")
//   res.send('USER go to users homepage')
// })

// HOST go to create new event page
app.get('/event/new', function(req, res){
  console.log('/event/new ')
  console.log('HOST go to create new event page')

  res.render('event_new')
})

// // HOST post the event host wants to create
// app.post('/event', function(req, res){
//   console.log(
//     "HOST post the event host wants to create: ",
//     req.body)
//   res.send('HOST post the event host wants to create')
// })

// HOST add courses & invitess to event
app.get('/event/:id/addinfo', function(req, res){
  console.log('/event/:id/addinfo ', 'req.params: ', req.params)
  console.log('HOST add Dishes & invite Guests to event')

  res.render('event_addinfo')
})

// GUEST view event page
app.get('/event/:id', function(req, res){
  console.log('/event/:id ', 'req.params: ', req.params)
  console.log('GUEST view event page')

  res.render('event_show',
    { event: {
        id: 3030,
        name: "bennie",
        time: "6pm",
        date: "1st Feb",
        description: "90's Themed",
        location: "123 Fake St"
      },
      dishes: [
        4,
        5,
        8
      ]
    })
})

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port + '\n')
})
