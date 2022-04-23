const knex = require("../../db/index")

const insertAccount = async (account) => {
  const newAccount = await knex("account").insert(account).returning("*");

  return newAccount[0]
}

const selectAccounts = async () => {
  // const accountList = await knex("account").select('*');
  const accountList = []
  for (let i = 0; i < 18000; i++) {
    accountList.push({
      id: i,
      balance: i,
      name: `account name ${i}`,
      note: `account note ${i}`,
      initial_balance: i,
      transactions: [],
      opening_date: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    })
  }
  console.log(accountList.length)
  return accountList;
}

module.exports = {
  selectAccounts,
  insertAccount
}