import React, { Component, Fragment } from "react";

import "./TaskList";

class TaskForm extends Component {
  constructor(){
    super();
    this.state = {
      title : "",
      description : "",
      tasks : []
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.fetchTasks();
  }

  addTask(e){
    fetch("/api/tasks", {
      method : "POST",
      body : JSON.stringify(this.state),
      headers : {
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      M.toast({html : "Task Saved"});
      this.setState({
        title : "",
        description : ""
      });
      this.fetchTasks();
    })
    .catch(err => console.error(err));
    e.preventDefault();
  }

  fetchTasks(){
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => {
        this.setState({tasks : data});
        console.log(this.state.tasks);
      });
  }
  
  handleChange(e){
    const { name, value } = e.target;
    this.setState({
      [name] : value
    })
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.addTask}>
          <div className="form-group">
            <label>Task Title</label>
            <input className="form-control" type="text" name="title" onChange={this.handleChange} value={this.state.title}/>
          </div>
          <div className="form-group">
            <label>Task Description</label>
            <textarea placeholder="Task Description" name="description" onChange={this.handleChange} value={this.state.description}></textarea>
          </div>
          <div className="form-group">
            <button className="submit border-corner btn-primary">Send Task</button>
          </div>
        </form>

        <table className="table table-dark">
        <thead>
          <tr className="text-center">
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.tasks.map(task => {
            return(
              <tr className="text-center" key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>@fat</td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
      </Fragment>
    );
  }
};

export default TaskForm;
