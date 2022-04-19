const knex = require("../../db/index")

const insertAccount = async (account) => {
  const newAccount = await knex("account").insert(account).returning("*");

  return newAccount[0]
}

const selectAccounts = async () => {
  const accountList = await knex("account").select('*');

  return accountList;
}

module.exports = {
  selectAccounts,
  insertAccount
}