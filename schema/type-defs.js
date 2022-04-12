const {gql} = require("apollo-server");

const typeDefs = gql`
type User {
 name: String!
 username: String!
 age: Int!
 nationality: Nationality!
}
type Query {
users: [User!]!
}

enum Nationality{
CANADA
BRAZIL
CHILE
INDIA
GERMANY
}

`
module.exports = {typeDefs};