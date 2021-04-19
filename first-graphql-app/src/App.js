const { GraphQLServer } = require('graphql-yoga');
const api = require("./api");

const resolvers = {
    Query: {
        users: api.fetchUsers,
        todos: api.fetchTodos,
        todo: (parent, args) => api.fetchTodoById(args.id),
        user: (parent, args) => api.fetchUserById(args.id),
    },
    User:{
        todos: user => api.fetchTodos({userId: user.id})
    },
    ToDoItem:{
        user: todo => api.fetchUserById(todo.userId)
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
