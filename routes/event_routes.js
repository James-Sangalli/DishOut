var express = require('express')
var router = express.Router()
var Event = require('../db/events')
var Host = require("../db/hosts")
var Dish = require("../db/dishes")
var Guest = require("../db/guests")

/***************************************
**********   GETS   *******************
***************************************/

// Go to the 'Create an Event' page
router.get('/new', (req, res) => {
  console.log('### GET /event/new')

  res.render('event_new')
})

// Go to the 'Add dish to an Event' page
router.get('/:id/dish/new', (req, res) => {
  // TODO
  // var userId = req.session.passport.user
  var userId = 4
  // var eventId = req.params.eventId
  var eventId = 4
  console.log('### GET /event/:id/dish/new', 'UserId', userId)

  Dish.getDishesByEventId(eventId,
    (err, dishes) => {
    if (err) {
      console.log('Failed getDishesByEventId', err)
      return
    }
    console.log('Success getDishesByEventId', dishes)
    res.render('event_dish_new', dishes)
  })
})

// Go to the 'Invite a Guest to an Event' page
router.get('/:id/guest/new', (req, res) => {
  // TODO
  // var userId = req.session.passport.user
  var userId = 4
  // var eventId = req.params.eventId
  var eventId = 4
  console.log('### GET /event/:id/guest/new', 'EventId', eventId)

  Guest.getGuestsByEventId(eventId,
    (err, guests) => {
    if (err) {
      console.log('Failed getGuestsByEventId', err)
      return
    }
    console.log('Success getGuestsByEventId', guests)
    res.render('event_guest_new', guestList)
  })
})

// Show Event page
router.get('/:id/show', (req, res) => {
  // TODO
  // var eventId = req.params.eventId
  var eventId = 2
  // var userId = req.session.passport.user
  var pageViewer = 4
  console.log('### GET /event/:id/show', 'UserId Viewing this page:', pageViewer)

  Event.getEventById(eventId,
    (err, event) => {
    if (err) {
      console.log('Failed getEventById', err)
      return
    }
    console.log('Success getEventById', event)
    Dish.getDishesByEventId(eventId,
      (err, dishes) => {
      if (err) {
        console.log('Failed getDishesByEventId', err)
        return
      }
      console.log('Success getDishesByEventId', dishes)
      Guest.getGuestsByEventId(eventId,
        (err, guests) => {
        if (err) {
          console.log('Failed getGuestsByEventId', err)
          return
        }
        console.log('Success getGuestsByEventId', guests)
        res.render('event_show', {
          "pageViewer": pageViewer,
          "event": event,
          "dishes": dishes,
          "guests": guests
        })
      })
    })
  })
})


/***************************************
**********   POSTS   *******************
***************************************/

// Creating event
router.post('/create', (req, res) => {
  // TODO
  // var eventId = req.params.id
  var eventId = 2
  // var userId = req.session.passport.user
  var userId = 4
  console.log('### POST /event/create', 'EventId', eventId)

  Event.createEvent({
      "name": req.body.name,
      "date": req.body.date,
      "time": req.body.time,
      "description": req.body.description,
      "location": req.body.location
    },
    (err, eventId) => {
      if (err) {
        console.log('Error creating event', err)
        res.send('Failed event creation')
        return
      }
      console.log('Event successfully created', eventId, userId)
      Host.createHost({
        'eventId': eventId,
        'userId': userId
        },
        (err, hostId) => {
          if (err) {
            console.log('Error adding to Hosts table', err)
            res.send('Failed adding to Hosts table')
            return
          }
          console.log('Event successfully added to Hosts', hostId)
          res.redirect('/event/' + eventId + '/dish/new')
      })
    })
})

router.post('/:id/dish/create', (req, res) => {
  // TODO
  // var eventId = req.params.id
  var eventId = 2
  // var userId = req.session.passport.user
  var userId = 4
  console.log('### POST /event/:id/dish/create', 'EventId', eventId)

  // TODO
  // insert the guest in to the database

  var dishObj = {
    course: 'MAINNnnnnnn',
    name: 'spaggggyyyybbbboole'
  }

  Dish.createDish(dishObj,
    (err, data) => {
      if (err) {
        console.log('Error createDish', err)
        res.send('Failed createDish')
        return
      }
      console.log('Success', data)
      res.redirect('/event/' + eventId + '/dish/new')
    }
  )
  // TODO
  // handle failure case with some sort of redirect
})

router.post('/:id/guest/create', (req, res) => {
  // TODO
  // var eventId = req.params.id
  var eventId = 2
  // var userId = req.session.passport.user
  var userId = 4
  console.log('### POST /event/:id/guest/create', 'EventId', eventId)

  // TODO
  // insert the guest in to the database

  res.redirect('/event/' + eventId + '/guest/new')
})

/***************************************
**********   UPDATE   *******************
***************************************/

router.post('/:id/edit', (req, res) => {
  // TODO
  // var eventId = req.params.id
  var eventId = 2
  console.log('### POST /event/:id/edit', 'EventId', eventId)

  // TODO
  // update the event (its name, location etc)

  res.redirect('/event/' + eventId + '/show')
})

module.exports = router
