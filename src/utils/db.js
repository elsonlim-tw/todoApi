const mongoose = require("mongoose");

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

if (!process.env.MONGO_URL) {
  throw new Error("no mongo url");
}

const url = process.env.MONGO_URL;
mongoose.connect(url, mongoOptions);

const db = mongoose.connection;
db.on("error", err => logger.error("error connecting to db:" + err));
db.once("open", () => {
  console.info("connected to mongodb");
});
