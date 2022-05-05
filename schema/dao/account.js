const knex = require("../../db/index")

const insertAccount = async (account) => {
  const newAccount = await knex("account").insert(account).returning("*");

  return newAccount[0]
}

const removeAccount = async (id) => {
  await knex("account").del().where({
    id: id
  });

  return id
}

const selectAccounts = async () => {
  // const accountList = await knex("account").select('*');
  const accountList = []
  for (let i = 0; i < 10; i++) {
    accountList.push({
      id: i,
      balance: i,
      name: `account name ${i}`,
      note: `account note ${i}`,
    })
  }
  console.log(accountList.length)
  return accountList;
}

module.exports = {
  selectAccounts,
  insertAccount,
  removeAccount
}