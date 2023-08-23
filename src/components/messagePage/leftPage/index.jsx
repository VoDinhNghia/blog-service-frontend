import React, { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";

class MessageLeftPage extends Component {
  render() {
    return (
      <div className="bg-light p-1 mb-2">
        <p className="m-3">
          <img src="/image/icon-login.png" className="IconUserMessage" alt="" />
          <Link>Vo Dinh Nghia</Link>
        </p>
        <p className="m-3">
          <img src="/image/icon-login.png" className="IconUserMessage" alt="" />
          <Link>Nguyen Hoang Bao Han</Link>
        </p>
      </div>
    );
  }
}

export default MessageLeftPage;
