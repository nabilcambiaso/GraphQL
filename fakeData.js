const AccountsList = [
  {
    id: 1,
    name: "CIH",
    balance: 100,
    initial_balance: 0,
    note: "My main account",
    opening_date: "2020-12-12",
    transactions: [],
    created_at: "2020-04-19",
    updated_at: "2020-04-19"
  },
  {
    id: 2,
    name: "BMCE 1",
    balance: 0,
    initial_balance: 0,
    note: "My second account",
    opening_date: "2020-12-12",
    transactions: [],
    created_at: "2020-04-19",
    updated_at: "2020-04-19"
  },
  {
    id: 3,
    name: "Tijari",
    balance: 290,
    initial_balance: 100,
    note: "My 3rd account",
    opening_date: "2020-12-12",
    transactions: [],
    created_at: "2020-04-19",
    updated_at: "2020-04-19"
  },
];

const TransactionsList = [
  {
    id: 1,
    account_id: 1,
    amount: 100,
    created_at: "2022-11-12",
    updated_at: "2022-11-12"
  },
  {
    id: 2,
    account_id: 1,
    amount: 0,
    created_at: "2022-11-12",
    updated_at: "2022-11-12"
  },
  {
    id: 3,
    account_id: 2,
    amount: 210,
    created_at: "2022-11-12",
    updated_at: "2022-11-12"
  },
  {
    id: 4,
    account_id: 3,
    amount: 90,
    created_at: "2022-11-12",
    updated_at: "2022-11-12"
  },
];

module.exports = { TransactionsList, AccountsList };