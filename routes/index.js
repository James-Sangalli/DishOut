// app/routes.js
var basic_routes = require('./basic_routes')
var user_routes = require('./user_routes')
var event_routes = require('./event_routes')
var dish_routes = require('./dish_routes')
var guest_routes = require('./guest_routes')
var facebook_routes = require("./facebook_routes")

module.exports = function(app, passport) {
  facebook_routes(app,passport)
  basic_routes(app, passport)
  app.use('/user', user_routes)
  app.use('/event', event_routes)
  app.use('/dish', dish_routes)
  app.use('/guest', guest_routes)
}
