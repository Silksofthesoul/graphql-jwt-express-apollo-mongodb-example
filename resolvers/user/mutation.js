const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  async signup(_, {username, email, password}) {
    const user = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10)
    });
    return jsonwebtoken.sign({
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '1y' }
    );
  },
  async login(_, {email, password}){
    const user = await User.findOne({email});
    if (!user) throw new Error('No user with that email');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Incorrect password');
    return jsonwebtoken.sign({
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
    );
  }
};
