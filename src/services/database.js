const mongoose = require("mongoose");
const connectionUrl =
  "mongodb+srv://TechMirusInnovations:I6CGZ43t4f4ceHsD@techmirus.c26go.mongodb.net/TechMirusInnovations";

const connectToDB = async () => {
  return await mongoose.connect(connectionUrl);
};

module.exports = { connectToDB };
