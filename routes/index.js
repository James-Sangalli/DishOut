// app/routes.js
var home_routes = require('./home_routes')
var user_routes = require('./user_routes')
var event_routes = require('./event_routes')
var facebook_routes = require("./facebook_routes")

module.exports = (app, passport) => {
  facebook_routes(app,passport)
  home_routes(app, passport)
  app.use('/user', user_routes)
  app.use('/event', event_routes)
}
