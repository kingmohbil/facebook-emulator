require('dotenv').config();
const mongoose = require('mongoose');

exports.connect = async (connectionString) => {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to the database successfully.');
  } catch (error) {
    console.log(`error while connecting the database ${error}`);
  }
};
