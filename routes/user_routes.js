var express = require('express')
var router = express.Router()
var User = require('../db/users')
var Event = require("../db/events")

/***************************************
**********   GETS   *******************
***************************************/

// User show redirect
router.get('/show', (req, res) => {
  // TODO
  var userId = req.session.passport.user
  // var userId = 4
  console.log('### GET /user/show', userId)

  res.redirect('/user/' + userId + '/show')
})

// Users Homepage
router.get('/:id/show', (req, res) => {
  // TODO
  var userId = req.session.passport.user
  // var userId = 4
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
                  'hosting': hosting,
                  'attending': attending
                })
            })
        })
    })
})

router.get('/edit', (req, res) => {
  // TODO
  var userId = req.session.passport.user
  // var userId = 4
  console.log('### GET /user/edit', 'redirecting to /user/:id/edit')
  res.redirect('/user/' + userId + '/edit')
})

router.get('/:id/edit', (req, res) => {
  // TODO
  var userId = req.session.passport.user
  // var userId = 4
  console.log('### GET /user/:id/edit', 'UserId: ', userId)

  User.getUserById(userId,
    (err, user) => {
      if (err) {
        console.log('Failed getUserById', err)
        return
      }
      console.log('Success getUserById', user)
      res.render('user_edit', {
        'user': user
      })
    })
})

/***************************************
**********   UPDATES   *****************
***************************************/

router.post('/:id/update', (req, res) => {
  // TODO
  var userId = req.session.passport.user
  // var userId = 4
  console.log('### POST/UPDATE /user/:id/update', 'UserId: ', userId)

  console.log('req.body:', req.body)
  var userChanges = {
    name: req.body.name,
    email: req.body.email
  }

  User.updateUser(userId, userChanges,
    (err, data) => {
      if (err) {
        console.log('Failed updateUser', data)
        return
      }
      console.log('Success updateUser', data)
      res.redirect('/user/' + userId + '/show')
    })
})

module.exports = router
