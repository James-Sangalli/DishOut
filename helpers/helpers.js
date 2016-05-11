var bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {

  hashUserObj: (preHash, cb) => {
    bcrypt.hash(preHash.password, saltRounds,
      (err, hash) => {
        if (err) {
          cb(err)
          return
        }
        var postHash = Object.assign({}, preHash)
        postHash.password = hash
        cb(null, postHash)
    })
  },

  unhashUserObj : (userObj) => {
    bcrypt.compare(userObj.password , userObj.hashedPassword,
      (err, response) => {
        if (err) {
          cb(err)
          return
        }
        cb(null, response)
    })
  },

  createDishObjs: (obj) => {
    var arr = []
    for (var i = 0; i < obj.numberOf; i++) {
      arr.push({
        'eventId': obj.eventId,
        'course': obj.course
      })
    }
    return arr
  },

  isLoggedIn: (req, res, next) => {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next()
    // if they aren't redirect them to the home page
    res.redirect('/')
  }

}
