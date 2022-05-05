/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('account').del()
  await knex('account').insert([
    { name: 'Account 1', balance: 200, note: "Account 1 test" },
    { name: 'Account 2', balance: 350, note: "Account 2 test" },
    { name: 'Account 3', balance: 20, note: "Account 3 test" },
  ]);
};
