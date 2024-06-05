import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css"

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className="PageNotFound">
        <p className="GoToHome">
          <Link to="/home">
            Go to home page
          </Link>
        </p>
        <img src="/image/pageNotFound.jpg" alt="not found" />
      </div>
    );
  }
}
