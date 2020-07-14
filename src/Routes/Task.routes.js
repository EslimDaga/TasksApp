const express = require("express");
const router = express.Router();

const Task = require("./../Models/Task");

//Getting the tasks using "Async" and "Await" for not have callback hell
router.get("/", async(req,res) => {
  const tasks = await Task.find();
  console.log(tasks);
  res.json(tasks)
});

//Getting task by Id 
router.get("/:id", async(req,res) => { 
  const task = await Task.findById(req.params.id);
  res.json(task);
});

//Post
router.post("/", async(req,res) => {
  const { title,description } = req.body;
  const task = new Task({title,description});
  await task.save();
  res.json({status : "Task Saved"});
});

//Put
router.put("/:id", async(req,res) => {
  const { title,description } = req.body;
  const newTask = {title,description};
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json("Task Updated");
});

//Delete
router.delete("/:id", async(req,res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json("Task Deleted");
});

module.exports = router;