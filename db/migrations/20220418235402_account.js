/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('account', function (t) {
    t.increments('id').unsigned().unique();
    t.string('name');
    t.double("balance");
    t.double("initial_balance");
    t.string("note");
    t.date("opening_date");
    t.timestamps(false, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('account');
};
