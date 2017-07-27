
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('items', (table) => {
      table.increments('id').primary()
      table.string('title')
      table.string('item_description')
      table.string('picture_url')
      table.decimal('price')
      table.timestamps(true, true)
    }),
    knex.schema.createTable('orders', (table)=>{
      table.increments('id').primary()
      table.decimal('total_price')
      table.timestamps(true, true)
    })
  ])
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('items'),
  ]);
};
