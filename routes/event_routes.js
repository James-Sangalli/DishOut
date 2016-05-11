var express = require('express')
var router = express.Router()
var Event = require('../db/events')
var Host = require("../db/hosts")
var Dish = require("../db/dishes")
var Guest = require("../db/guests")
var User = require("../db/users")
var Help = require('../helpers/helpers')

/**************************************
**********   GETS   *******************
***************************************/

// Go to the 'Create an Event' page
router.get('/new', (req, res) => {
  console.log('### GET /event/new')
  res.render('event_new')
})

// Go to the 'Add dish to an Event' page
router.get('/:id/dish/new', (req, res) => {
  var userId = req.session.passport.user
  var eventId = req.params.id

  console.log('### GET /event/:id/dish/new', 'UserId', userId, 'EventId', eventId)

  Dish.getDishesByEventId(eventId,
    (err, dishes) => {
    if (err) return console.log('Failed getDishesByEventId', err)

    console.log('Success getDishesByEventId', dishes)

    Host.isHost({'userId': userId, 'eventId': eventId},
      (err, isHost) => {
      if (err) return console.log('Failed isHost', err)

      console.log('Success isHost', isHost)
      res.render('event_dish_new', {
        'isHost':isHost,
        'eventId': eventId,
        'dishes': dishes
}) }) }) })

// Go to the 'Invite a Guest to an Event' page
router.get('/:id/guest/new', (req, res) => {
  var userId = req.session.passport.user
  var eventId = req.params.id
  // var userId = 1
  // var eventId = 1

  console.log('### GET /event/:id/guest/new', 'EventId', eventId)

  Guest.getGuestsByEventId(eventId,
    (err, guests) => {
    if (err) return console.log('Failed getGuestsByEventId', err)

    console.log('Success getGuestsByEventId', guests)
    res.render('event_guest_new', {
      eventId: eventId,
      guests: guests
}) }) })

// Show Event page
router.get('/:id/show', (req, res) => {
  var eventId = req.params.id
  var userId = req.session.passport.user
  console.log('### GET /event/:id/show', 'UserId Viewing this page:', userId, 'EventId:', eventId)

  Event.getEventById(eventId,
    (err, event) => {
    if (err) return console.log('Failed getEventById', err)

    console.log('Success getEventById', event)
    Dish.getDishesByEventId(eventId,
      (err, dishes) => {
      if (err) return console.log('Failed getDishesByEventId', err)

      console.log('Success getDishesByEventId', dishes)
      Guest.getGuestsByEventId(eventId,
        (err, guests) => {
        if (err) return console.log('Failed getGuestsByEventId', err)

        Host.isHost({
          'userId': userId,
          'eventId': eventId
          },
          (err, isHost) => {
          if (err) return console.log('Failed isHost', err)

          console.log('Success isHost', isHost)
          res.render('event_show', {
            'isHost': isHost,
            'eventId': eventId,
            "userId": userId,
            "event": event,
            "dishes": dishes,
            "guests": guests
}) }) }) }) }) })

// Go to Edit Event page
router.get('/:id/edit', (req, res) => {
  var eventId = req.params.id
  console.log('### GET /event/:id/edit', 'EventId:', eventId)

  Event.getEventById(eventId,
    (err, event) => {
    if (err) return console.log('Failed getEventById', err)

    console.log('Success getEventById', event)
    res.render('event_edit', event)
})})

/***************************************
**********   POSTS   *******************
***************************************/

// Creating event
router.post('/create', (req, res) => {
  var userId = req.session.passport.user
  console.log('### POST /event/create', 'UserId', userId)

  Event.createEvent({
      "name": req.body.name,
      "date": req.body.date,
      "time": req.body.time,
      "description": req.body.description,
      "location": req.body.location,
      "bitcoinAddress":req.body.bitcoinAddress
    },
    (err, eventId) => {
      if (err) return console.log('Error creating event', err)

      console.log('Event successfully created', eventId, userId)
      Host.createHost({
        'eventId': eventId,
        'userId': userId
        },
        (err, hostId) => {
          if (err) return console.log('Error adding to Hosts table', err)

          console.log('Event successfully added to Hosts', hostId)
          res.redirect('/event/' + eventId + '/dish/new')
}) }) })


router.post('/:id/dish/create', (req, res) => {
  var eventId = req.params.id
  var userId = req.session.passport.user
  console.log('### POST /event/:id/dish/create', 'EventId', eventId)

  Dish.createDish({
      eventId: eventId,
      course: req.body.course,
      name: req.body.dishname
    },
    (err, data) => {
      if (err) return console.log('Error createDish', err)

      console.log('Success', data)
      res.redirect('/event/' + eventId + '/dish/new')
}) })


router.post('/:id/guest/create', (req, res) => {
  var eventId = req.params.id
  // var eventId = 1

  console.log('### POST /event/:id/guest/create', 'EventId', eventId)
  console.log("req.body ", req.body)
  var userSearch = req.body.userSearch.toLowerCase().trim()

  var query = {}

  if (userSearch.includes("@")) {
    query.email = userSearch
  } else {
    query.name = userSearch
  }

  console.log("query ",query)

  User.getUserByEmailOrName(query,
    (err, user) => {
      if (err) return console.log('Failed getUserByEmailOrName', err)

      console.log("Successful getUserByEmailOrName", user)
      Guest.createGuest({
          'eventId': eventId,
          'userId': user.id
        },
        (err, guestId) => {
          if (err) return console.log('Failed createGuest', err)
          console.log("Successful createGuest", guestId)
          res.redirect('/event/' + eventId + '/guest/new')
}) }) })


/***************************************
**********   UPDATE   *******************
***************************************/


router.post('/:id/update', (req, res) => {
  var eventId = req.params.id
  console.log('### POST /event/:id/edit', 'EventId', eventId)

  Event.updateEvent(eventId,  {
      name: req.body.name,
      date: req.body.date,
      time: req.body.time,
      description: req.body.description,
      location: req.body.location
    },
    (err, guestId) => {
      if (err) return console.log('Failed createGuest', err)

      console.log("Successful createGuest", guestId)
      res.redirect('/event/' + eventId + '/show')
  })
})

router.post('/:eId/dish/:dId/update', (req, res) => {
  var eventId = req.params.eId
  var dishId = req.params.dId
  var userId = req.session.passport.user
  console.log('### POST /event/:id/dish/update', 'EventId', eventId)

  Dish.updateDish(dishId, eventId, {
      'userId': userId,
      'name': req.body.dishName ? req.body.dishName : ''
    },
    (err, data) => {
      if (err) return console.log('Failed updateGuest', err)

      console.log("Successful updateGuest", data)
      res.redirect('/event/' + eventId + '/show')
  })
})

module.exports = router
