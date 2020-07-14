const express = require("express");
const morgan = require("morgan");
const path = require("path");

const { mongoose } = require("./Database");

const app = express();

//Settings
app.set("port",process.env.PORT || 3000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/tasks",require("./Routes/Task.routes"));

//Statics Files
app.use(express.static(path.join(__dirname,"public")));

//Starting the server
app.listen(app.set("port"), () => {
  console.log("Server on Port " + app.get("port"));
});
