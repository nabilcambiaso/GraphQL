const { PubSub } = require('graphql-subscriptions');
const {
    selectAccounts,
    selectTransaction,
    selectTransactionByAccountId,
    insertAccount,
    removeAccount,
    insertTransaction
} = require("./dao/index");

const pubSub = new PubSub();
const resolvers = {
    Query: {
        accounts: async (parent, args, context, info) => {
            const data = await selectAccounts();
            if (data) {
                return { accounts: data };
            }
            else {
                return { message: 'there was an error', statusCode: 500 };
            }
        },
        transactions: async (parent, args, context, info) => {
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
            return account;
        },
        createTransaction: async (parent, args) => {
            const transaction = await insertTransaction(args.input)
            await pubSub.publish("TRANSACTION_CREATED", {
                transactionCreated: transaction
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
        transactionCreated: {
            subscribe: () => pubSub.asyncIterator("TRANSACTION_CREATED")
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