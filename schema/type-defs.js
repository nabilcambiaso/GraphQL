const { gql } = require("apollo-server");


const typeDefs = gql`
scalar Date

type Query {
  accounts: AccountsResult
  transactions: TransactionsResult
}

#mutate data (similar to post, put, delete)
type Mutation {
  createAccount( input: createAccountsInput! ): Account
  createTransaction( input: createTransactionInput! ): Transaction
  deleteAccount( input: deleteAccountsInput! ): Int
}

input createTransactionInput {
  account_id: Int!
  amount: Float!
}

input createAccountsInput {
  name: String!
  balance: Float!
  initial_balance: Float!
  note: String!
}

input deleteAccountsInput {
  id: Int!
}

type Account {
  id: Int!
  name: String!
  balance: Float!
  note: String!
  transactions: [Transaction]
}

type Transaction {
  id: Int!
  account_id: Int!
  amount: Float!
  created_at: Date
  updated_at: Date
}

type Subscription {
  accountCreated: Account!
  transactionCreated: Transaction!
}

type AccountSuccessfulResult {
  accounts: [Account!]!
}

type AccountsErrorResult {
  message: String!
  statusCode:Int!
}

type TransactionsSuccessfulResult {
  transactions: [Transaction!]!
}

type TransactionsErrorResult {
message: String!
statusCode:Int!
}

union AccountsResult = AccountSuccessfulResult | AccountsErrorResult
union TransactionsResult = TransactionsSuccessfulResult | TransactionsErrorResult
`
module.exports = { typeDefs };