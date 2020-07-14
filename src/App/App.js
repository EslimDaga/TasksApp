import React, { Component, Fragment } from "react";
//Import Components
import NavBar from "./Components/NavBar";
import Preloader from "./Components/Preloader";
import Section from "./Components/Section";


class App extends Component {
  render(){
    return(
      <Fragment>
        <Preloader/>
        <NavBar/>
        <Section/>
      </Fragment>
    );
  }
};

export default App;