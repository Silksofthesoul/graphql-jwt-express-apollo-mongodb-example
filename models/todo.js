const mongo = require('../controllers/mongo.js');

const obj = {
  db: { collection: 'todo' }
};

obj.create = async (args) => {
  const db = await mongo.connect(obj.db.collection);
  const id = await mongo.getNewId(db.collection);
  await db
    .collection
    .insertOne({id,...args});
  const res = await db
    .collection
    .findOne({id});
  db.client.close();
  return res;
};
obj.find = async (args) => {
  const res = await mongo.find({
    collection: obj.db.collection,
    ...args
  });
  return res;
};
obj.remove = async (args) => {
  const db = await mongo.connect(obj.db.collection);
  const id = args.id;
  await db
    .collection
    .findOneAndDelete({id});
  db.client.close();
};
obj.update = async (args) => {
  const db = await mongo.connect(obj.db.collection);
  const id = args.id;
  const title = args.title;
  await db
    .collection
    .updateOne(
      {id},
      {$set: {title}}
    );
  db.client.close();
};

module.exports = obj;
