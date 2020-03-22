const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

let connection;

beforeAll(async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL missing");
  }
  connection = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  global.db = await connection.db();
});

afterAll(async () => {
  await connection.close();
  await mongoose.disconnect();
});

afterEach(async () => {
  jest.resetAllMocks();
  await global.db.dropDatabase();
});
