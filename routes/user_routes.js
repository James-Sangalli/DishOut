var express = require('express')
var router = express.Router()
var User = require('../db/users')
var Event = require("../db/events")

// User show redirect
router.get('/show', (req, res) => {
  // TODO
  // var userId = req.session.passport.user
  var userId = 4
  console.log('### GET /user/show', userId)

  res.redirect('/user/' + userId + '/show')
})

// Users Homepage
router.get('/:id/show', (req, res) => {
  // TODO
  // var userId = req.session.passport.user
  var userId = 4
  console.log('### GET /user/:id/show', 'UserId:',userId)

  User.getUserById(userId,
    (err, user) => {
      if (err) {
        console.log("Error getUserById from DB", err)
        res.send('Failed getUserById')
        return
      }
      console.log("getUserById returned, now on to getHostedEvents")
      Event.getEventsByHostId(userId,
        (err, hosting) => {
          if (err) {
            console.log("Error getEventsByHostId", err)
            res.send('Failed getEventsByHostId' )
            return
          }
          console.log("Successful getEventsByHostId", hosting)
          Event.getEventsByGuestId(userId,
            (err, attending) => {
              if (err) {
                console.log("Error getEventsByGuestId", err)
                res.send('Failed getEventsByGuestId')
                return
              }
              console.log("Successful getEventsByGuestId", attending)
              res.render('user_show',
                {
                  'user': user,
                  'hostedEvents': hosting,
                  'guestedEvents': attending
                })
            })
        })
    })
})

router.get('/:id/edit', (req, res) => {
  // TODO
  // var userId = req.session.passport.user
  var userId = 4
  console.log('### GET /user/:id/edit', 'UserId: ', userId)

  User.getUserById(userId,
    (err, data) => {
      if (err) {
        console.log('Failed getUserById', err)
        return
      }
      console.log('Success getUserById', data)
      res.render('user_edit', {
        'userInfo': data
      })
    })
})

module.exports = router
