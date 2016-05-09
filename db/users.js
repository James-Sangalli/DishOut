var knexConfig = require('../knexfile')
var knex = require('knex')(knexConfig[process.env.NODE_ENV || "development"])

module.exports = {

  createUser: (userObj) => {
    knex("users").insert(userObj)
      .then( (data) => cb(null, data[0]) )
      .catch( (err) => cb(err) )
  },

  getUserByEmail: (email, cb) => {
    return knex.select().where("email",email).table("users")
      .then( (data) => cb(null, data[0]) )
      .catch( (err) => cb(err) )
  },

  getUserById: (userId, cb) => {
    knex.select().where("id", userId).table("users")
      .then( (data) => cb(null, data[0]) )
      .catch( (err) => cb(err) )
  },

  getUserByName: (userName, cb) => {
    knex("users").select().where("name", userName)
      .then( (data) => cb(null, data[0]) )
      .catch( (err) => cb(err) )
  }

}
