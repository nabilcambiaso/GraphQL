const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");

const server = new ApolloServer({typeDefs,resolvers,context:({req})=>{
    return {"token":"Bearer exampleToken","req":req}
}});

server.listen().then(({url}) => {
    console.log(`server is running on port ${url}`);
})