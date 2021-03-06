const Todo = require('../../models/todo');

module.exports = {
  async addTodo(_, {title}, {user}) {
    if(!user) throw new Error('You are not authenticated!');
    const newTodo = await Todo.create({
      userId: user.id,
      title
    });
    return newTodo;
  },
  async remTodo(_, {id}, {user}) {
    if(!user) throw new Error('You are not authenticated!');
    await Todo.remove({
      userId: user.id,
      id
    });
    return await Todo.find({userId: user.id});
  },
  async updTodo(_, {id, title}, {user}) {
    if(!user) throw new Error('You are not authenticated!');
    await Todo.update({
      userId: user.id,
      id,
      title
    });
    return await Todo.find({userId: user.id});
  }
};
