const User = require('../../models/user');
module.exports = {
  async me(_, args, {user}){
    if(!user) throw new Error('You are not authenticated!');
    return await User.findOne({id: user.id});
  }
};
