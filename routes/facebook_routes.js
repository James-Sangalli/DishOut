
module.exports = function (app, passport) {
  app.get('/auth/facebook',
  passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/user/show')
  })
}
