const Todo = require('../../models/todo');
module.exports = {
  async myTodos(_, args, {user}) {
    if(!user) throw new Error('You are not authenticated!');
    return await Todo.find({userId: user.id});
  }
};
