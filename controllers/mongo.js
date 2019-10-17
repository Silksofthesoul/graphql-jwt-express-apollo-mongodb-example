const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();

const removeProperty = (prop) => ({ [prop]: _, ...object }) => object;
//removeProperty('propname')(object);

const obj = {
  db: {
    url: process.env.DB_HOST,
    name: process.env.DB_NAME,
    collection: null
  }
};

obj.connect = async (_collectionName = undefined) => {
  const collectionName = _collectionName || obj.db.collection;
  if(!collectionName) return false;
  const mongoClient = new MongoClient(obj.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  obj.db.collection = collectionName;
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
  const db = await obj.connect(args.collection || obj.db.collection);
  args = removeProperty('collection')(args);
  let res = await db
    .collection
    .findOne(args);
  db.client.close();
  return res;
};

obj.updateOne = async (args) => {
  const db = await obj.connect(args.collection || obj.db.collection);
  args = removeProperty('collection')(args);
  let res = await db
    .collection
    .updateOne(args);
  db.client.close();
  return res;
};

obj.find = async (args) => {
  const db = await obj.connect(args.collection || obj.db.collection);
  args = removeProperty('collection')(args);
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

module.exports = obj;
