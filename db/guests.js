// var knexConfig = require('../knexfile')
// var knex = require('knex')(knexConfig[process.env.NODE_ENV || "development"])
var knex = require('./knexOrigin')

module.exports = {

  createGuest: (guestObj, cb) => {
    knex("guests").insert(guestObj)
      .then( (data) => cb(null, data[0]) )
      .catch( (err) => cb(err) )
  },

  getEventsByUserId: (userId, cb) => {
    knex("guests").select().where("userId", userId)
      .then( (data) => cb(null, data) )
      .catch( (err) => cb(err) )
  },

  getGuestsByEventId: (eventId, cb) => {
    knex('guests').select()
      .join('users', 'users.id', '=', 'guests.userId')
      .where('guests.eventId', eventId)
      .then( (data) => cb(null, data) )
      .catch( (err) => cb(err) )
  }

}
