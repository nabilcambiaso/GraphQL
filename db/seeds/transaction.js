/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('transaction').del()
  await knex('transaction').insert([
    { account_id: 1, amount: 200 },
    { account_id: 1, amount: 300 },
    { account_id: 1, amount: 400 },
    { account_id: 2, amount: 200 },
    { account_id: 2, amount: 300 },
    { account_id: 2, amount: 400 },
    { account_id: 3, amount: 200 },
    { account_id: 3, amount: 300 },
    { account_id: 3, amount: 500 },
  ]);
};
