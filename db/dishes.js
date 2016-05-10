var knexConfig = require('../knexfile')
var knex = require('knex')(knexConfig[process.env.NODE_ENV || "development"])

module.exports = {

  getDishByDishId: (dishId, cb) => {
    knex.select().where("id", dishId).table("dishes")
      .then( (data) => cb(null, data) )
      .catch( (err) => cb(err) )
  },

  getDishesByEventId: (eventId, cb) => {
    knex('dishes').select('dishes.*', 'users.name as userName')
      .leftJoin('users', 'dishes.userId', '=', 'users.id')
      .where('dishes.eventId', eventId)
      .then( (data) => cb(null, data) )
      .catch( (err) => cb(err) )
  },

  createDish: (dishObj, cb) => {
    knex('dishes').insert(dishObj)
      .then( (data) => cb(null, data))
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
  }

}
