var knexConfig = require('../knexfile')
var knex = require('knex')(knexConfig[process.env.NODE_ENV || "development"])

module.exports = {
 createHost: (hostObj, cb) => {
    knex('hosts').insert(hostObj)
      .then( (data) => cb(null, data[0]) )
      .catch( (err) => cb(err) )
  },

  isHost: (hostObj, cb) => {
    knex('hosts').select().where(hostObj)
      .then( (data) => cb(null, !!data[0]) )
      .catch( (err) => cb(err) )
  }
}
