import React, { Component, Fragment } from "react";

class NavBar extends Component {
  render(){
    return(
      <header id="header" className="header main-header">
        <div className="container">
          <div className="flex-header">
            <div id="logo" className="logo">
              <a href="index.html" title="Logo"><img src="images/logo/logo01.png" alt="images" data-width="115" data-height="50" data-retina="images/logo/logo01@2x.png"/></a>
            </div>
            <div className="content-menu">
              <div className="nav-wrap">
                <div className="btn-menu"><span></span></div>
                <nav id="mainnav" className="mainnav">
                  <ul className="menu">
                    <li>
                      <a href="#" className="active">Home</a>
                    </li>
                  </ul>
                </nav>
              </div>
                <div className="lang-user">
                  <div className="user">
                    <a href="/" className="block"></a>
                    <a href="/" className="icon"><span className="icon-user"></span></a>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </header>
    );
  }
};

export default NavBar;