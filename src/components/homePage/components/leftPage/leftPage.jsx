import React, { Component } from "react";
import { connect } from "react-redux";
import AuthService from "../../../../services/authService";
import { BsPersonWorkspace, BsChatQuote } from "react-icons/bs";
import { Button } from "react-bootstrap";
import "./index.css";

class LeftHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: null,
    };
  }

  render() {
    const currentUser = AuthService.getCurrentUser();
    return (
      <>
        <div className="LeftMenuHomePage">
          <div className="InfoUserMenuHomePage">
            <span>
              <img
                src={`${currentUser?.avatar || "/image/icon-login.png"}`}
                alt={`${currentUser?.firstName || ""}`}
                className="PersonelAvatarLeftHomePage"
              />
              <h5 className="PersonelNameLeftHomePage">
                {`${currentUser?.lastName || ""} ${
                  currentUser?.middleName || ""
                } ${currentUser?.firstName || ""} ${
                  currentUser?.code ? `- ${currentUser?.code}` : ""
                }`}
              </h5>
              <p>role: {currentUser?.role?.toLowerCase()}</p>
            </span>
            <hr />
            <a href={"not-yet"} className="LinkLeftHomePage">
              <BsPersonWorkspace className="IconLeftHomePage" /> Study space
            </a>
          </div>
          <hr />
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
