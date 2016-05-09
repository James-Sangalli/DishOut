exports.up = function(knex, Promise) {
  console.log('tables created')

  return Promise.all( [knex.schema.createTableIfNotExists('users', function(table) {
    table.increments('id')
    table.string('name')
    table.string('email').unique()
    table.string('password').nullable()
  }),
  knex.schema.createTableIfNotExists('hosts', function(table) {
    table.increments('id')
    table.integer('eventId')
    table.integer('userId')
  }),
 knex.schema.createTableIfNotExists('guests', function(table) {
    table.increments('id')
    table.integer('eventId')
    table.integer('userId')
  }),
   knex.schema.createTableIfNotExists('events', function(table) {
    table.increments('id')
    table.string('name')
    table.datetime('date') // add a migration to change this 
    //table.string('time')  // not needed
    table.string('description')
    table.string('location')
  }),
  knex.schema.createTableIfNotExists("dishes",function(table){
    table.increments('id')
    table.string('course')
    table.string('name').nullable()
    table.integer('eventId')
    table.integer('userId').nullable()
  })
])
};

exports.down = function(knex, Promise) {
  return Promise.all ([
    knex.schema.dropTableIfExists('users').then(function () {
      console.log('userTable was dropped')
    }),
    knex.schema.dropTableIfExists('hosts').then(function () {
      console.log('hostTable was dropped')
    }),
    knex.schema.dropTableIfExists('guests').then(function () {
      console.log('guestTable was dropped')
    }),
    knex.schema.dropTableIfExists('dishes').then(function () {
      console.log('dishTable was dropped')
    }),
    knex.schema.dropTableIfExists('events').then(function () {
      console.log('eventsTable was dropped')
    })
  ])

};
