const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();
const obj = {
  db: {
    url: process.env.DB_HOST,
    name: process.env.DB_NAME,
    collection: 'todo'
  }
};
obj.connect = async () => {
  const mongoClient = new MongoClient(obj.db.url, { useNewUrlParser: true });
  return new Promise((resolve, reject) => {
    mongoClient.connect((err, client) => {
      if(err) reject(err);
      const db = client.db(obj.db.name);
      const collection = db.collection(obj.db.collection);
      resolve({ client, db, collection});
    });
  });
};

obj.findOne = async (args) => {
  const db = await obj.connect();
  let res = await db
    .collection
    .findOne(args);
  db.client.close();
  return res;
};
obj.find = async (args) => {
  const db = await obj.connect();
  let res = await db
    .collection
    .find(args)
    .toArray();
  db.client.close();
  return res;
};
obj.getNewId = async (collection) => {
  let lastItem = await collection
    .find()
    .sort({ $natural: -1 })
    .limit(1)
    .toArray();
  let id = (lastItem[0] && lastItem[0].id !== undefined) ? lastItem[0].id + 1 : 0;
  return id;
};
obj.create = async (args) => {
  const db = await obj.connect();
  const id = await obj.getNewId(db.collection);
  await db
    .collection
    .insertOne({id,...args});
  const res = await db
    .collection
    .findOne({id});
  db.client.close();
  return res;
};

module.exports = obj;
