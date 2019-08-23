const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();
/* eslint-disable no-undef */
const obj = {
  db: {
    url: 'mongodb://localhost:27017/',
    name: process.env.DB_NAME,
    collection: 'users'
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
  let res = await db.collection.findOne(args);
  db.client.close();
  return res;
};
obj.getNewId = async (collection) => {
  let lastUser = await collection.find()
            .sort({ $natural: -1 })
            .limit(1)
            .toArray();
  let id = (lastUser[0]&&lastUser[0].id !== undefined) ? lastUser[0].id + 1 : 0;
  return id;
};
obj.create = async (args) => {
  const db = await obj.connect();
  const id = await obj.getNewId(db.collection);
  await db.collection.insertOne({id,...args});
  const res = await db.collection.findOne({email: args.email});
  db.client.close();
  return res;
};

module.exports = obj;
