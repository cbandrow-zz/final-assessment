exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', (table) =>{
      table.string('date');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', (table) =>{
      table.dropColumn('date')
    })
  ])
};
