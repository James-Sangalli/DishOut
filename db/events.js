// var knexConfig = require('../knexfile')
// var knex = require('knex')(knexConfig[process.env.NODE_ENV || "development"])
var knex = require('./knexOrigin')

module.exports = {

  createEvent: (eventObj, cb) => {
    knex('events').insert(eventObj)
      .then( (data) => cb(null, data[0]) )
      .catch( (err) => cb(err) )
  },

  getEventById: (eventId, cb) => {
    knex.select().where("id", eventId).table("events")
      .then( (data) => cb(null, data[0]) )
      .catch( (err) => cb(err) )
  },

  getEventsByHostId: (userId, cb) => {
    knex('hosts').select()
      .join('events', 'hosts.eventId', '=', 'events.id')
      .where('hosts.userId', userId)
      .then( (data) => cb(null, data) )
      .catch( (err) => cb(err) )
  },

  getEventsByGuestId: (userId, cb) => {
    knex('guests').select()
      .join('events', 'guests.eventId', '=', 'events.id')
      .where('guests.userId', userId)
      .then( (data) => cb(null, data) )
      .catch( (err) => cb(err) )
  },

  updateEvent: (eventId, eventChanges, cb) => {
    knex('events').update(eventChanges).where('id', eventId)
      .then( (data) => cb(null, data[0]) )
      .catch( (err) => cb(err) )
  }

}
