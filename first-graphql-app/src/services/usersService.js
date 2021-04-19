const api = require('../api');

const UserService = () => {
  let _lastId = 100;
  let _users = [];

  api
    .fetchUsers()
    .then(res => _users = [..._users, ...res]);

  return {
    getUsers: () => _users,

    getUserById: userId => _users.find(user => user.id === userId),

    addUser: ({ name, email, login }) => {
      const newUser = {
        id: String(_lastId += 1),
        name,
        email,
        login
      };
      _users.push(newUser);
      return newUser;
    },

    editUser: (userId, { name, email, login }) => {
      const userToEdit = _users.find(user => user.id === userId);
      if (!userToEdit) return;

      if (name) userToEdit.name = name;
      if (email) userToEdit.email = email;
      if (login) userToEdit.name = login;

      return userToEdit;
    },

    removeUser: userId => {
      const userToRemove = _users.find(user => user.id === userId);
      if (!userToRemove) return;

      _users = _users.filter(user => user !== userToRemove)
      return userToRemove;
    }
  }
}

module.exports = UserService();
