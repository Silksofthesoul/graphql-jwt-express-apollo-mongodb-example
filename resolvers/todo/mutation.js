const Todo = require('../../models/todo');

module.exports = {
  async addTodo(_, {title}, {user}) {
    if(!user) throw new Error('You are not authenticated!');
    const newTodo = await Todo.create({
      userId: user.id,
      title
    });
    return newTodo;
  }
};
