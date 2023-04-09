import React, { Component } from "react";

export default class NotFoundRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Not found page</h3>
        </header>
      </div>
    );
  }
}
