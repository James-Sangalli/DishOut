var knexConfig = require('../knexfile')
var knex = require('knex')(knexConfig[process.env.NODE_ENV || "development"])

module.exports = {

  getDishByDishId: (dishId, cb) => {
    knex.select().where("id", dishId).table("dishes")
      .then( (data) => cb(null, data) )
      .catch( (err) => cb(err) )
  },

  getDishesByEventId: (eventId, cb) => {
    knex.select().where('eventId', eventId).table('dishes')
      .then( (data) => cb(null, data) )
      .catch( (err) => cb(err) )
  },

  createManyDishes: (manyDishObjs, cb) => {
    knex('dishes').insert(manyDishObjs)
      .then( (data) => cb(null, data))
      .catch( (err) => cb(err) )
  },

  updateGuest: (dishObj, cb) => {
    knex('dishes').where('id', dishObj.dishId)
    .update({'userId': dishObj.userId})
      .then( (data) => cb(null, data))
      .catch( (err) => cb(err) )
  },

  updateName: (dishObj, cb) => {
    knex('dishes').where('id', dishObj.dishId)
    .update({'name': dishObj.name})
      .then( (data) => cb(null, data))
      .catch( (err) => cb(err) )
  },

  getDishesPlusEventInfo: (eventId, cb) => {
    knex('dishes').select('dishes.course as dishCourse',
                          'dishes.name as dishName',
                          'dishes.userId as dishUserId')
      .join('events', 'events.id', '=', 'dishes.eventId')
      .where('events.id', eventId)
      .then( (data) => cb(null, data) )
      .catch( (err) => cb(err) )
  }

}
