const queryUser = require('./user/query');
const mutationUser = require('./user/mutation');

const queryTodo = require('./todo/query');
const mutationTodo = require('./todo/mutation');


const obj = {
  Query: {
    ...queryUser,
    ...queryTodo
  },
  Mutation: {
    ...mutationUser,
    ...mutationTodo
  }
};
module.exports = obj;
