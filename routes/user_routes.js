var express = require('express')
var router = express.Router()
var User = require('../db/users')
var Event = require("../db/events")

/***************************************
**********   GETS   *******************
***************************************/

// User show redirect
router.get('/show', (req, res) => {
  // console.log('### GET /user/show')
  res.redirect('/user/' + req.session.passport.user + '/show')
})

// Users Homepage
router.get('/:id/show', (req, res) => {
  var userId = req.session.passport.user
  console.log('### GET /user/:id/show', 'UserId:',userId)

  User.getUserById(userId,
    (err, user) => {
      if (err) return console.log("Error getUserById from DB", err)

      console.log("Success getUserById", user)
      Event.getEventsByHostId(userId,
        (err, hosting) => {
          if (err) return console.log("Error getEventsByHostId", err)

          console.log("Successful getEventsByHostId", hosting)
          Event.getEventsByGuestId(userId,
            (err, attending) => {
              if (err) return console.log("Error getEventsByGuestId", err)

              console.log("Successful getEventsByGuestId", attending)
              res.render('user_show',
                {
                  'user': user,
                  'hosting': hosting,
                  'attending': attending
}) }) }) }) })


router.get('/edit', (req, res) => {
  console.log('### GET /user/edit', 'redirecting to /user/:id/edit')
  res.redirect('/user/' + req.session.passport.user + '/edit')
})


router.get('/:id/edit', (req, res) => {
  var userId = req.session.passport.user
  console.log('### GET /user/:id/edit', 'UserId: ', userId)

  User.getUserById(userId,
    (err, user) => {
      if (err) return console.log('Failed getUserById', err)

      console.log('Success getUserById', user)
      res.render('user_edit', { 'user': user })
}) })


/***************************************
**********   UPDATES   *****************
***************************************/

// Post user update
router.post('/:id/update', (req, res) => {
  var userId = req.session.passport.user
  console.log('### POST/UPDATE /user/:id/update', 'UserId: ', userId)

  User.updateUser(userId,
    { name: req.body.name,
      email: req.body.email
    },
    (err, data) => {
      if (err) return console.log('Failed updateUser', data)

      console.log('Success updateUser', data)
      res.redirect('/user/' + userId + '/show')
}) })

module.exports = router
