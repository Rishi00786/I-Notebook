const mongoose = require('mongoose')

const MongoseURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const ConnectToMongo = async () => {
    try {
      await mongoose.connect(MongoseURI);
      console.log("Connected To Mongo Successfully");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  };
  

module.exports = ConnectToMongo;