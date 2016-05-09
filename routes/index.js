// app/routes.js
var basic_routes = require('./basic_routes')
var user_routes = require('./user_routes')
var event_routes = require('./event_routes')
var dish_routes = require('./dish_routes')
var guest_routes = require('./guest_routes')



module.exports = function(app, passport) {
  // app.use('/', basic_routes)
  basic_routes(app, passport) // fb related ... ??  passport local -- rename
  app.use('/user', user_routes)
  app.use('/event', event_routes)
  app.use('/dish', dish_routes)
  app.use('/guest', guest_routes)
}
