import React, { Component } from "react"

class Preloader extends Component {
  render() {
    return (
      <div id="loading-overlay">
        <div className="loader"></div>
      </div>
    );
  }
};

export default Preloader;