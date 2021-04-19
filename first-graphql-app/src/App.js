const usersService = require("./services/usersService");
const { GraphQLServer } = require('graphql-yoga');
const api = require("./api");

const resolvers = {
    Query: {
        users: usersService.getUsers,
        todos: api.fetchTodos,
        todo: (parent, args) => api.fetchTodoById(args.id),
        user: (parent, args) => usersService.getUserById(args.id),
    },
    User:{
        todos: user => api.fetchTodos({userId: user.id})
    },
    ToDoItem:{
        user: todo => usersService.getUser(todo.userId)
    },

    Mutation: {
        addUser: (parent, args) => usersService.addUser(args.data),
        editUser: (parent, args) => usersService.editUser(args.id, args.data),
        removeUser: (parent, args) => usersService.removeUser(args.id)
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
