const { TransactionsList } = require("../fakeData");
const _ = require("lodash");
const {PubSub} = require('graphql-subscriptions');

const pubSub= new PubSub();
const resolvers = {

    Query: {
        //TRANSACTIONS RESOLVERS
        transactions: (parent,args,context,info) => {
           // console.log(context)
            if(TransactionsList){
                return {transactions:TransactionsList};
            } 
            else{
                return {message:'there was an error',statusCode:500};
            }
        }

    },
    Mutation:{
        createTransaction:  (parent,args)=>{
            const transaction=args.input;
            const id=Number(TransactionsList[TransactionsList.length-1].id)+1;
            transaction.id= id;
             TransactionsList.push(transaction);
            pubSub.publish("TRANSACTION_CREATED",{
                transactionCreated:{
                    account_name:transaction.account_name
                }
            })
            return transaction;
        }
    },
    Subscription: {
        transactionCreated:{
            subscribe:()=> pubSub.asyncIterator("TRANSACTION_CREATED")
        }
    },

    TransactionsResult: {
        __resolveType (obj) {
            if(obj.transactions)
            {
                return "TransactionsSuccessfulResult";
            }
            if(obj.message)
            {
                return "TransactionsErrorResult";
            }
            return null;

        }
    }


}

module.exports = { resolvers };