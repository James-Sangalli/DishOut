var knexConfig = require('../knexfile')
var knex = require('knex')(knexConfig[process.env.NODE_ENV || "development"])

module.exports = {

  createUser: (userObj, cb) => {
    knex("users").insert(userObj)
      .then( (data) => cb(null, data[0]) )
      .catch( (err) => cb(err) )
  },

  getUserByEmail: (email, cb) => {
    // use knex('users')   .. or just be consisteny
    knex.select().where("email",email).table("users")
      .then( (data) => cb(null, data[0]) )
      .catch( (err) => cb(err) )
  },

  getUserById: (userId, cb) => {
    knex.select().where("id", userId).table("users")
      .first()  // or ('*') ?
      .then( (data) => cb(null, data[0]) )
      .catch( (err) => cb(err) )
  },

  getUserByName: (userName, cb) => {
    knex("users").select().where("name", userName)
      .then( (data) => cb(null, data[0]) )
      .catch( (err) => cb(err) )
  }

  getUserByEmail: queryUsersByColumnCreator( 'email', email, cb )

}

//option A
//function getUserByQuery(query)
  knex('users').select().where(query)
// query = {email: 'dave@gmail.com'}

//option B
function queryUsersByColumnCreator( colName, value, cb ) {
  return function( value, cb ) {
    knex("users").select().where(colName, value)
      .then( (data) => cb(null, data[0]) )
      .catch( (err) => cb(err) )

  }
}

