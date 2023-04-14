import React, { Component } from "react";
import { connect } from "react-redux";
import { BsChatQuote } from "react-icons/bs";
import { Button } from "react-bootstrap";
import InfoUserPanel from "../../../commons/InfoUserPanel/index";
import "./index.css";

class LeftHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="LeftMenuHomePage">
          <InfoUserPanel />
          <p className="TiteListFriendHomePage">
            List friends study common major (status online)
          </p>
          <div className="ListFriendMajorLeftHomePage">
            <p>
              <span>
                <img
                  src="/image/icon-login.png"
                  alt=""
                  className="FriendMajorAvatar"
                />
                <a href="not-yet">Vo Dinh A </a>{" "}
                <Button className="BtnMessageLeftMenuHome" variant="ligth">
                  <BsChatQuote />
                </Button>
              </span>
            </p>
            <p>
              <span>
                <img
                  src="/image/icon-login.png"
                  alt=""
                  className="FriendMajorAvatar"
                />
                <a href="not-yet">Vu Dinh Nguyen Nghia </a>{" "}
                <Button className="BtnMessageLeftMenuHome" variant="ligth">
                  <BsChatQuote />
                </Button>
              </span>
            </p>
            <p>
              <span>
                <img
                  src="/image/icon-login.png"
                  alt=""
                  className="FriendMajorAvatar"
                />
                <a href="not-yet">Nguyen Van A </a>{" "}
                <Button className="BtnMessageLeftMenuHome" variant="ligth">
                  <BsChatQuote />
                </Button>
              </span>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default connect()(LeftHomePage);
