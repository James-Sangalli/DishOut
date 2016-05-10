var express = require('express')
var router = express.Router()
var Dish = require("../db/dishes")
var Help = require('../helpers/helpers')

// Add dish to event
router.post('/:eventId/:userId', function(req, res){
  console.log('### POST /dish/:eventId/:userId')

  var manyDishObjs = Help.createDishObjs({
    'eventId': req.params.eventId,
    'course': req.body.course,
    'numberOf': req.body.numberOf || 1
  })

  Dish.createManyDishes(manyDishObjs,
    (err, manyDishIds) => {
      if (err) {
        console.log('Failed inserting dish as host', err)
        res.send('Failed inserting dish as host')
        return
      }
      console.log('Successfully inserted dish as host', manyDishIds)
      res.redirect('/event/' + req.params.eventId + '/addinfo')
    })
})

router.post('/claim/:dishId/:userId/:eventId', function(req, res){
  console.log('### POST /dish/claim/:dishId/:userId/:eventId')
  console.log('asdf', {
    'dishId': req.params.dishId,
    'userId': req.params.userId
    })
  Dish.updateGuest({
    'dishId': req.params.dishId,
    'userId': req.params.userId
    },
    (err, data) => {
      if (err) {
        console.log('Failed addGuestToDish', err)
        res.send('Failed addGuestToDish')
        return
      }
      console.log('Successfully addGuestToDish', data)
      res.redirect('/event/' + req.params.eventId)
  })
})

router.post('/name/:dishId/:userId/:eventId', function(req, res){
  console.log('### POST /dish/name/:dishId/:userId/:eventId')

  Dish.updateName({
    'dishId': req.params.dishId,
    'userId': req.params.userId,
    'name': req.body.newDishName
    },
    (err, data) => {
      if (err) {
        console.log('Failed addNameToDish', err)
        res.send('Failed addNameToDish')
        return
      }
      console.log('Successfully addNameToDish', data)
      res.redirect('/event/' + req.params.eventId)
  })
})

module.exports = router
