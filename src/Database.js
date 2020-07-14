const mongoose = require("mongoose");
const URI = "mongodb+srv://admin:admin@cluster0.ye3dh.mongodb.net/mern-tasks?retryWrites=true&w=majority";

mongoose.connect(URI)
  .then(db => console.log("Db is connected"))
  .catch(err => console.error(err));

module.exports = mongoose;