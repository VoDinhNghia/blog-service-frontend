import React, { Component } from "react";
import NewGroup from "./newGroup";
import "./index.css";

class RightStudySpace extends Component {
  render() {
    return (
      <>
        <NewGroup />
        <div className="RightStudySpace">Display group list</div>
      </>
    );
  }
}

export default RightStudySpace;
