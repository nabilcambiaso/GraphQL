const { PubSub } = require('graphql-subscriptions');
const {
    selectAccounts,
    selectTransaction,
    selectTransactionByAccountId,
    insertAccount,
    removeAccount,
    insertTransaction
} = require("./dao/index");
const pg = require('pg');

const pubSub = new PubSub();
const dbConfig = {
    host: "127.0.0.1",
    port: 5432,
    database: "graphql_db",
    user: "postgres",
    password: "123456",
    ssl: false
}
var client = new pg.Client(dbConfig);

client.connect((err, data, done) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("database connected")
        client.query("LISTEN update_transaction");
        client.query("LISTEN update_account");
        client.query("LISTEN add_transaction");
        client.query("LISTEN add_account");
        client.query("LISTEN delete_account");


        data.on('notification', async (msg) => {
            console.log(msg.channel)
            switch (msg.channel) {
                case "update_transaction":
                    await pubSub.publish("TRANSACTION_UPDATED", {
                        transactionUpdated: JSON.parse(msg.payload)
                    })
                    break;
                case "update_account":
                    await pubSub.publish("ACCOUNT_CREATED", {
                        accountCreated: JSON.parse(msg.payload)
                    })
                    break;
                case "add_account":
                    await pubSub.publish("ACCOUNT_CREATED", {
                        accountCreated: JSON.parse(msg.payload)
                    })
                    break;
                case "add_transaction":
                    await pubSub.publish("TRANSACTION_CREATED", {
                        transactionCreated: JSON.parse(msg.payload)
                    })
                    break;
                case "delete_account":
                    await pubSub.publish("ACCOUNT_DELETED", {
                        accountDeleted: JSON.parse(msg.payload)
                    })
                    break;
                default: break;
            }
        })

    }
})
const resolvers = {
    Query: {
        accounts: async (parent, args, context, info) => {
            console.log("accounts")
            const data = await selectAccounts();
            if (data) {
                return { accounts: data };
            }
            else {
                return { message: 'there was an error', statusCode: 500 };
            }
        },
        transactions: async (parent, args, context, info) => {
            console.log("first")
            const data = await selectTransaction();
            if (data) {
                return { transactions: data };
            }
            else {
                return { message: 'there was an error', statusCode: 500 };
            }
        }
    },
    Mutation: {
        createAccount: async (parent, args) => {
            console.log(args)
            const account = await insertAccount(args.input);
            await pubSub.publish("ACCOUNT_CREATED", {
                accountCreated: account
            })
            return account;
        },
        deleteAccount: async (parent, args) => {
            const account = await removeAccount(args.input.id);
            await pubSub.publish("ACCOUNT_DELETED", {
                accountDeleted: account
            })
            return account;
        },
        createTransaction: async (parent, args) => {
            const transaction = await insertTransaction(args.input)
            const result = transaction;
            console.log(result)
            await pubSub.publish("TRANSACTION_CREATED", {
                transactionCreated: result
            })
            return transaction;
        }
    },
    Account: {
        transactions: async (account) => {
            return await selectTransactionByAccountId({
                account_id: account.id
            })
        }
    },
    Subscription: {
        accountCreated: {
            subscribe: () => pubSub.asyncIterator("ACCOUNT_CREATED")
        },
        accountDeleted: {
            subscribe: () => pubSub.asyncIterator("ACCOUNT_DELETED")
        },
        transactionCreated: {
            subscribe: () => pubSub.asyncIterator("TRANSACTION_CREATED")
        },
        transactionUpdated: {
            subscribe: () => pubSub.asyncIterator("TRANSACTION_UPDATED")
        }
    },
    AccountsResult: {
        __resolveType(obj) {
            if (obj.accounts) {
                return "AccountSuccessfulResult";
            }
            if (obj.message) {
                return "AccountsErrorResult";
            }
            return null;
        }
    },
    TransactionsResult: {
        __resolveType(obj) {
            if (obj.transactions) {
                return "TransactionsSuccessfulResult";
            }
            if (obj.message) {
                return "TransactionsErrorResult";
            }
            return null;
        }
    }
}

module.exports = { resolvers };