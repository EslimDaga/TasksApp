import React, { Component } from "react";

class TaskList extends Component {
  constructor(){
    super();
    this.state = {
      tasks : []
    };
  }

  componentDidMount(){
    this.fetchTasks();
  }

  prueba(){
    console.log("Hi im from tasklist");
  }

  fetchTasks(){
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => {
        this.setState({tasks : data});
        console.log(this.state.tasks);
      });
  }

  render() {
    return (
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
    );
  }
};

export default TaskList;
