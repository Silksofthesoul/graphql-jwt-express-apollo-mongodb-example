const mongo = require('../controllers/mongo.js');

const obj = {
  db: { collection: 'users' }
};

obj.findOne = async (args) => {
  let res = await mongo.findOne({
    collection: obj.db.collection,
    ...args
  });
  return res;
};

obj.create = async (args) => {
  const db = await mongo.connect(obj.db.collection);
  const id = await mongo.getNewId(db.collection);
  await db.collection.insertOne({id,...args});
  const res = await db.collection.findOne({email: args.email});
  db.client.close();
  return res;
};

module.exports = obj;
