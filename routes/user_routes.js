var express = require('express')
var router = express.Router()
var User = require('../db/users')
var Event = require("../db/events")

// Users Homepage
router.get('/:id', function(req, res) {
  console.log('### GET /user/:id', req.session.userId)
  req.session.userId = 4
  User.getUserById(req.session.userId,
    (err, user) => {
      if (err) {
        console.log("Error getUserById from DB", err)
        res.send('Failed getUserById')
        return
      }
      console.log("getUserById returned, now on to getHostedEvents")
      Event.getEventsByHostId(req.session.userId,
        (err, hosting) => {
          if (err) {
            console.log("Error getEventsByHostId", err)
            res.send('Failed getEventsByHostId')
            return
          }
          console.log("Successful getEventsByHostId", hosting)
          Event.getEventsByGuestId(req.session.userId,
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

module.exports = router
