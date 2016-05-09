var express = require('express')
var router = express.Router()
var User = require("../db/users")
var Help = require("../helpers/helpers")

module.exports = function (app, passport) {
  router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/user/:id', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
    }));

  // Homepage
  router.get('/', function(req, res){
    console.log("### GET '/'")

    res.render('index')
  })


    // Logout
  router.get("/logout",function(req,res){
    console.log('### GET /logout')

    req.logout()
    res.redirect("/")
  })

  app.use('/', router)
}

// app.get('/profile', isLoggedIn, function(req, res) {
//       res.render('profile.ejs', {
//           user : req.user // get the user out of session and pass to template
//       });
//   });

// function isLoggedIn(req, res, next) {

//     // if user is authenticated in the session, carry on
//     if (req.isAuthenticated())
//         return next();

//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }
