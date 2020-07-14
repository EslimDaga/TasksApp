import React, { Component } from "react";

class Section extends Component {
  constructor(){
    super();
    this.state = {
      title : "",
      description : "",
      tasks : [],
      _id : ""
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.fetchTasks();
  }

  addTask(e){
    if(this.state._id){
      fetch("/api/tasks/" + this.state._id, {
        method : "PUT",
        body : JSON.stringify(this.state),
        headers : {
          "Accept" : "application/json",
          "Content-Type" : "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          title : "",
          description : "",
          _id : ""
        });
        this.fetchTasks();
      });
    }else{
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
    }
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

  deleteTask(id){
    if(confirm("¿Are you sure you want to delete it?")){
      fetch("/api/tasks/" + id, {
        method : "DELETE",
        headers : {
          "Accept" : "application/json",
          "Content-Type" : "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.fetchTasks();
      });
    }
  }

  editTask(id){
    fetch("/api/tasks/" + id)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          title : data.title,
          description : data.description,
          _id : data._id
        })
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
      <section className="flat-team-members team-members-has-bg p-team-members">
      <br/>
        <div className="container">
            <div className="title-section text-center wow fadeInDown">
                <p className="sub-heading color-two">By Eslim Daga</p>
                <h2 className="flat-title shape-image in-center">Task App</h2>
            </div>
            <div className="row position-relative">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 wow fadeInUp">
                <div className="team-members-by-eslim">
                  <div className="card">
                    <div className="card-body">
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 wow fadeInUp" data-wow-delay="1200ms">
                <div className="team-members-by-eslim">
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
                            <td>
                              <button className="btn btn-primary" onClick={() => this.editTask(task._id)}>Edit</button>
                              <button className="btn btn-danger ml-1" onClick={() => this.deleteTask(task._id)}>Delete</button>
                            </td>
                          </tr>
                        );
                      })
                    }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="pattern3 wow fadeInLeft none-mobile" data-wow-delay="1400ms"><img src="images/team-members/16.png" alt="images"/></div>
              <div className="pattern4 wow fadeInLeft none-mobile" data-wow-delay="1500ms"><img src="images/team-members/17.png" alt="images"/></div>
            </div>
        </div>
    </section>
    );
  }
};

export default Section;