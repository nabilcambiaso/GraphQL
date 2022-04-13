const { UserList, MovieList } = require("../fakeData");
const _ = require("lodash");


const resolvers = {

    Query: {
        //USERS RESOLVERS
        users: () => {
            return UserList;
        },
        user: (parent, args) => {
            const id = args.id;
            const user = _.find(UserList, { id: Number(id) })
            return user;
        },

        //MOVIES RESOLVERS
        movies: () => {
            return MovieList;
        },
        movie: (parent, args) => {
            const name = args.name;
            const movie = _.find(MovieList, { name })
            return movie;
        }
    },
    Mutation:{
        createUser: (parent,args)=>{
            const user=args.input;
            const id=Number(UserList[UserList.length-1].id)+1;
            user.id= id;
            UserList.push(user);
            return user;
        },
        updateUserName: (parent,args) => {
            const {id,updatedUserName}=args.input;
            let updatedUser;
            UserList.forEach((user) => {
                if(Number(user.id) == Number(id))
                {
                    user.username=updatedUserName;
                    updatedUser=user;
                }
            })
            return updatedUser;
        },
        deleteUser:(parent,args) => {
           const id=args.id;
           _.remove(UserList,(user)=> user.id === Number(id) );
           return null;
        }
    },
    User: {
        favoriteMovies: () => {
            return _.filter(MovieList, (movie) =>
                movie.yearOfPublication > 2000 && movie.yearOfPublication < 2010
            );
        }
    }
}

module.exports = { resolvers };