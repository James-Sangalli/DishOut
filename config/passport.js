var User = require('../db/users')
var LocalStrategy   = require('passport-local').Strategy;
var helpers = require("../helpers/helpers")
var User = require("../db/users")
var FBStrategy = require('passport-facebook').Strategy;
if(process.env.NODE_ENV != "production"){
  require("dotenv").config()
}


module.exports = function (passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
      console.log('serializing:', user)
      done(null, user.id)
    })

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
      console.log('deserializing:', id)
        User.getUserById(id, function (err, user) {
            done(err, user);
        });
    });

    // setup facebook signin
    passport.use(new FBStrategy({
     clientID: process.env.FBID,
     clientSecret: process.env.FBSECRET,
     callbackURL: require("./index").callbackURL
   },

   function(accessToken, refreshToken, profile, done) {
     process.nextTick(function () {

       console.log(profile)

       User.getUserByName(profile.displayName, function (err,user) {
         if(err) {
           console.log('ERR: in local-signup getUserByName', err)
           return done(err)
         }

         if (user) {
           console.log('USER=truthy: in local-signup getUserByName', user)
           return done(null, user)
         }
         else {
           console.log('about to make new user (whats from fb):', profile)
           var newUser = {
             name: profile.displayName.toLowerCase(),
             password:"noPasswordProvided"
           }
           console.log('after to make new user (what is user?):', newUser)

           helpers.hashUserObj(newUser, function (err, hashedUser) {
             if (err) {
               console.log('has failed', err)
               throw Error('bens error thing', err)
             }
             User.createUser(hashedUser, function (err,data) {
               if(err) {
                 console.log('failed creating user', err)
                 throw Error('bens other error thing', err)
               }
               hashedUser.id = data
               console.log("user successfully create: ", hashedUser)
               return done(null,hashedUser)
             })
           })
         }
     })
   })
 }))


    passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function (req, email, password, done) {

      process.nextTick(function () {

        User.getUserByEmail(email, (err, user) => {
          if(err) {
            console.log('ERR: in local-signup getUserByEmail', err)
            return done(err)
          }

          if (user) {
            console.log('USER=truthy: in local-signup getUserByEmail', user)
            return done(null, user)
          }
          else {
            console.log('about to make new user (whats req.body?):', req.body)
            var newUser = {
              name: req.body.name.toLowerCase(),
              email: email.toLowerCase(),
              password: password
            }
            console.log('after to make new user (what is user?):', newUser)

            helpers.hashUserObj(newUser, function (err, hashedUser) {
              if (err) {
                console.log('has failed', err)
                throw Error('bens error thing', err)
              }
              User.createUser(hashedUser, function (err,data) {
                if(err) {
                  console.log('failed creating user', err)
                  throw Error('bens other error thing', err)
                }
                hashedUser.id = data
                console.log("user successfully create: ", hashedUser)
                return done(null, hashedUser)
              })
            })
          }
      })
    })
  })
)

}
