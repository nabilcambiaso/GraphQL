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
  // const transactionList = await knex("transaction").select('*');
  const transactionList = []
  for (let j = 0; j < 100000; j++) {
    let account_id = 0;
    if (j > 10000) account_id = 1;
    if (j > 20000) account_id = 2;
    if (j > 30000) account_id = 3;
    if (j > 40000) account_id = 4;
    if (j > 50000) account_id = 4;

    transactionList.push({
      id: j,
      amount: j,
      account_id: account_id,
      created_date: new Date(),
    })
  }
  return transactionList
}

module.exports = {
  selectTransaction,
  selectTransactionByAccountId,
  insertTransaction
}