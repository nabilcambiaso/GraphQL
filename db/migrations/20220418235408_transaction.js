/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('transaction', function (t) {
    t.increments('id').unsigned().unique();
    t.integer('account_id')
      .unsigned()
      .index()
      .references('id')
      .inTable('account');
    t.double('amount');
    t.timestamps(false, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('transaction');
};
