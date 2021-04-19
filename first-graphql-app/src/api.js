const axios = require("axios");

const fetchTodos = ({userId} = {}) => axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      params: {userId}
    })
    .then(res => res.data);

const fetchTodoById = id => axios
  .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
  .then(res => res.data);

const fetchUsers = () => axios
  .get("https://jsonplaceholder.typicode.com/users")
  .then(res => res.data.map(mapUserResponse))

const fetchUserById = id => axios
  .get(`https://jsonplaceholder.typicode.com/users/${id}`)
  .then(res => mapUserResponse(res.data))

const mapUserResponse = ({ id, name, email, username }) => ({
  id: String(id),
  name,
  email,
  login: username
});

module.exports = {
  fetchTodos,
  fetchTodoById,
  fetchUsers,
  fetchUserById
}