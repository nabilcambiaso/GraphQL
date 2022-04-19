const { gql } = require("apollo-server");


const typeDefs = gql`

type Query {
transactions: TransactionsResult
}


#mutate data (similar to post, put, delete)
type Mutation {
createTransaction( input: createTransactionInput! ): Transaction
}



input createTransactionInput {
    account_name: String!
 note: String
 balance: Int!
}

type Transaction {
 id:ID!,
 account_name: String!
 note: String
 balance: Int!

}



type Subscription {
  transactionCreated: Transaction
}


type TransactionsSuccessfulResult {
transactions: [Transaction!]!
}

type TransactionsErrorResult {
message: String!
statusCode:Int!
}

union TransactionsResult = TransactionsSuccessfulResult | TransactionsErrorResult
`
module.exports = { typeDefs };