const { gql } = require("apollo-server");

const typeDefs = gql`

type Query {
users: [User!]!
user (id:ID!): User
movies: [Movie!]!
movie(name: String!): Movie
}

type User {
 name: String!
 username: String!
 age: Int!
 nationality: Nationality!
 friends: [User]
}

type Movie {
id: ID,
name: String,
yearOfPublication: Int,
isInTheaters: Boolean,
}

enum Nationality{
CANADA
BRAZIL
CHILE
INDIA
GERMANY
}

`
module.exports = { typeDefs };