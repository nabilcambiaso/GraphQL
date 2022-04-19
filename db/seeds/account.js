/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('account').del()
  await knex('account').insert([
    { name: 'Account 1', balance: 200, initial_balance: 100, note: "Account 1 test" },
    { name: 'Account 2', balance: 350, initial_balance: 250, note: "Account 2 test" },
    { name: 'Account 3', balance: 20, initial_balance: 0, note: "Account 3 test" },
  ]);
};
