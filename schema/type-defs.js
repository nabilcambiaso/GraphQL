const { gql } = require("apollo-server");


const typeDefs = gql`

type Query {
users: UsersResult
user (id:ID!): User
movies: [Movie!]!
movie(name: String!): Movie
}

#mutate data (similar to post, put, delete)
type Mutation {
createUser( input: createUserInput! ): User
updateUserName ( input: updateUserNameInput! ): User
deleteUser (id:ID!): User
}

input updateUserNameInput {
id:ID!
updatedUserName:String!
}

input createUserInput {
 name: String!
 username: String!
 age: Int = 18
 nationality: Nationality
}

type User {
 id:ID!,
 name: String!
 username: String
 age: Int!
 nationality: Nationality!
 friends: [User]
 favoriteMovies: [Movie]

}

type Movie {
id: ID,
name: String,
yearOfPublication: Int,
isInTheaters: Boolean,
}

type Subscription {
  userCreated: User
}

enum Nationality{
CANADA
BRAZIL
CHILE
INDIA
GERMANY
}

type UsersSuccessfulResult {
users: [User!]!
}

type UsersErrorResult {
message: String!
statusCode:Int!
}

union UsersResult = UsersSuccessfulResult | UsersErrorResult
`
module.exports = { typeDefs };