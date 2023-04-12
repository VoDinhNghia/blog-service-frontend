import React, { Component } from "react";
import "./index.css";

class LeftHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="leftMenu">
          <h4>left menu home page</h4>
          <p>some design such as search, user list online...</p>
        </div>
      </>
    );
  }
}

export default LeftHomePage;
