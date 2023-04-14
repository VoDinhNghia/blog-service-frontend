import React, { Component } from "react";
import "./index.css";
import InfoUserPanel from "../../commons/InfoUserPanel/index";

class LeftPersonel extends Component {
  render() {
    return (<>
      <div className="LeftMenuPersonel">
        <InfoUserPanel />
        <p>button share post, list image, follow ,...</p>
      </div>
    </>);
  }
}

export default LeftPersonel;
