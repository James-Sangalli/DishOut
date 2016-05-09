var knex = require('./connection')

/***
 * in ./connection.js
var knexConfig = require('../knexfile')
var knex = require('knex')(knexConfig[process.env.NODE_ENV || "development"])

module.exports = knex
**/

module.exports = {
 createHost: (hostObj, cb) => {
   console.log('try add hosstobj', hostObj)
    knex('hosts').insert(hostObj)
      .then( (data) => cb(null, data[0]) )
      .catch( (err) => cb(err) )
  }
}
