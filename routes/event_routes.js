var express = require('express')
var router = express.Router()
var Event = require('../db/events')
var Host = require("../db/hosts")
var Dish = require("../db/dishes")
var Guest = require("../db/guests")

// Screen for creating an event
router.get('/new', function(req, res){
  console.log('### GET /event/new')

  res.render('event_new')
})

// Creating event
router.post('/', function(req, res) {
  console.log('### POST /event ')

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
      console.log('Event successfully created', eventId, req.session.userId)
      Host.createHost({
        'eventId': eventId,
        'userId': req.session.userId
        },
        (err, hostId) => {
          if (err) {
            console.log('Error adding to Hosts table', err)
            res.send('Failed adding to Hosts table')
            return
          }
          console.log('Event successfully added to Hosts', hostId)
          res.redirect('/event/' + eventId + '/addinfo')
      })
    })
})


// /event/:id/guests/create
// /event/:id/dishes/create
// /event/:id/info/create

// dishes/create?eventId=3  << this makes event seem optional

// CRUD
// ReSTFul

// Screen for adding info to an event
router.get('/:id/addinfo', function(req, res){
//router.get('/:id/info/new', function(req, res){
//router.post('/:id/info/create', function(req, res){
  console.log('### GET /event/:id/addinfo')

  Event.getEventById(req.params.id,
    (err, event) => {
      if (err) {
        console.log('Failed to retrieve event by eventID ', err)
        res.send('Failed to retrieve event by eventID')
        return
      }
      console.log("Successful getEventById", event)
      Dish.getDishesByEventId(req.params.id,
        (err, dishes) => {
          if (err) {
            console.log('Failed to retrieve dishes by eventID ', err)
            res.send('Failed to retrieve dishes by eventID')
            return
          }
          console.log("Successful getDishesByEventID", dishes)
          Guest.getGuestsByEventId(req.params.id,
            (err, guests) => {
              if (err) {
                console.log('Failed to getGuestsOfEventId', err)
                res.send('Failed to getGuestsOfEventId')
                return
              }
              console.log("Successful getGuestsOfEventId", guests)
              res.render('event_addinfo', {
                'userId': req.session.userId,
                'event': event,
                'dishes': dishes,
                'guests': guests
              })
          })
        })
    })
})

// View event page
router.get('/:id', function(req, res){
  console.log('### GET /event/:id')

  Event.getEventById(req.params.id,
    (err, event) => {
      if (err) {
        console.log('Failed to get event by id', err)
        res.send('Failed to get event by id')
        return
      }
      console.log('Successfully got event', event)
      Dish.getDishesByEventId(req.params.id,
        (err, dishesByEvent) => {
          if (err) {
            console.log('Failed to get dishes by event', err)
            res.send('Failed to get dishes by event')
            return
          }
          console.log('Successfully got dishes', dishesByEvent)
          Dish.updateUserNameOfMany(dishesByEvent,
            (err, updatedDishes) => {
              if (err) {
                console.log('Failed to add user names to dishes', err)
                res.send('Failed to add user names to dishes')
                return
              }
              console.log('Successfully got dishes', updatedDishes)
              res.render('event_show', {
                "event": event,
                "dishes": updatedDishes,
                "userId": req.session.userId
              })
          })
      })
    })
})

module.exports = router
