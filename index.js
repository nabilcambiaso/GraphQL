const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");
const express = require('express');
const { createServer } = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');

(async function () {
    const app = express();
    const httpServer = createServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    const subsciptionServer = SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: '/graphql' }
    )

    const server = new ApolloServer({
        schema,
        plugins: [
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subsciptionServer.close();
                        }
                    }
                }
            }
        ]
    });

    await server.start();
    server.applyMiddleware({ app });
    const PORT = 4000;
    httpServer.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })

})();
