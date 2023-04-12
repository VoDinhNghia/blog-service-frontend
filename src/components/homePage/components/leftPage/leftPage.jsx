import React, { Component } from "react";
import { connect } from "react-redux";
import AuthService from "../../../../services/authService";
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
        <div className="leftMenu">
          <span>
            <img
              src={`${currentUser?.avatar || "/image/icon-login.png"}`}
              alt={`${currentUser?.firstName || ""}`}
              className="PersonelAvatarLeftHomePage"
            />
            <h5 className="PersonelNameLeftHomePage">
            {`${currentUser?.lastName || ""} ${
                    currentUser?.middleName || ""
                  } ${currentUser?.firstName || ""}`}
            </h5>
            <p>
              {currentUser?.role?.toLowerCase()}
            </p>
          </span>
        </div>
      </>
    );
  }
}

export default connect()(LeftHomePage);
