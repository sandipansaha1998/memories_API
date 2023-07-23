const mongoose = require("mongoose");
const env = require("./enviroment").MONGO_KEY;
console.log(env);
const uri = `mongodb+srv://${env.user}:${env.password}@cluster0.ucj81es.mongodb.net/memories_api?retryWrites=true&w=majority`;

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("You successfully connected to MongoDB!");
  } catch (e) {
    console.log("Connection to Mongo Failed");
    throw new Error("Mongo Connection");
  }
}
module.exports = run;
