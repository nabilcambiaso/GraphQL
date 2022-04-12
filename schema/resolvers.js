const {UserList,MovieList} = require("../fakeData");
const _ = require("lodash");
const resolvers = {
    Query: {
        //USERS RESOLVERS
        users: () => {
          return UserList;
        },
        user: (parent,args) => {
           const id = args.id;
           const user = _.find( UserList, {id:Number(id)})
           return user;
        },

        //MOVIES RESOLVERS
        movies: () => {
            return MovieList;
        },
        movie: (parent,args) => {
            const name = args.name;
            const movie = _.find( MovieList, {name})
            return movie;
        }
    }
}

module.exports = {resolvers};