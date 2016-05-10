module.exports = {
  callbackURL: process.env.NODE_ENV === "production" ? "https://frozen-atoll-63358.herokuapp.com/auth/facebook/callback" : "http://localhost:8080/auth/facebook/callback"
}
