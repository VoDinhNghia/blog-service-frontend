import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";

class LeftHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: null,
    };
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

export default connect()(LeftHomePage);
