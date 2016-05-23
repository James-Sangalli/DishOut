module.exports = {
  callbackURL: process.env.NODE_ENV === "production" ? "http://dishout-potluck.herokuapp.com/auth/facebook/callback" : "http://localhost:8080/auth/facebook/callback"
}
