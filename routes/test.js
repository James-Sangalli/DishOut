var knexConfig = require('../knexfile')
var knex = require('knex')(knexConfig[process.env.NODE_ENV || "development"])

knex('dishes').select('dishes.*', 'users.name as userName')
  .leftJoin('users', 'dishes.userId', '=', 'users.id')
  .where('dishes.eventId', 4)
  .then( (data) => console.log(data) )
  .catch( (err) => console.log(err) )
