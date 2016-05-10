var express = require('express')
var router = express.Router()
var User = require("../db/users")
var Help = require("../helpers/helpers")

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = function (app, passport) {
  // Homepage
  router.get('/', function(req, res){
    console.log("### GET '/'")
    res.render('index')
  })

  router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/user/show', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
  }));

  router.post("/login", passport.authenticate('local-signup', {
        successRedirect : '/user/show', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
  }));

    // Logout
  router.get("/logout",function(req,res){
    console.log('### GET /logout')

    req.logout()
    res.redirect("/")
  })

  app.use('/', router)
}
