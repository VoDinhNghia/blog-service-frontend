import React, { Component } from "react";
import AuthService from "../../../services/authService";
import { BsPersonWorkspace } from "react-icons/bs";
import "./index.css";
import { Link } from 'react-router-dom';
import { routes } from "../../../common/constant";

class InfoUserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const currentUser = AuthService.getCurrentUser();
    return (
      <>
        <div className="InfoUserMenuHomePage">
          <span>
            <img
              src={`${currentUser?.avatar || "/image/icon-login.png"}`}
              alt={`${currentUser?.firstName || ""}`}
              className="PersonelAvatarLeftHomePage"
            />
            <Link
              to={{
                pathname: routes.PERSONEL,
              }}
              state={{userId: currentUser?.id}}
              onClick={() => window.location.reload()}
              className="LinkToPersonelLeftHomePage"
            >
              <h5 className="PersonelNameLeftHomePage">
                {`${currentUser?.lastName || ""} ${
                  currentUser?.middleName || ""
                } ${currentUser?.firstName || ""} ${
                  currentUser?.code ? `- ${currentUser?.code}` : ""
                }`}
              </h5>
            </Link>
            <p>role: {currentUser?.role?.toLowerCase()}</p>
          </span>
          <hr />
          <a href={"not-yet"} className="LinkLeftHomePage">
            <BsPersonWorkspace className="IconLeftHomePage" /> Study space
          </a>
        </div>
        <hr />
      </>
    );
  }
}

export default InfoUserPanel;
