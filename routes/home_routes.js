var express = require('express')
var router = express.Router()

module.exports = (app, passport) => {
  // Homepage
  router.get('/', (req, res) => {
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
  router.get("/logout", (req,res) => {
    console.log('### GET /logout')

    req.logout()
    res.redirect("/")
  })

  app.use('/', router)
}
