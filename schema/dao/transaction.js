const knex = require("../../db/index")

const insertTransaction = async (transaction) => {
  const newTransaction = await knex("transaction").insert(transaction).returning("*");

  return newTransaction[0]
}

const selectTransactionByAccountId = async ({
  account_id
}) => {
  const transactionList = await knex("transaction").select('*').where({
    account_id
  });

  return transactionList
}

const selectTransaction = async () => {
  const transactionList = await knex("transaction").select('*');

  return transactionList
}

module.exports = {
  selectTransaction,
  selectTransactionByAccountId,
  insertTransaction
}