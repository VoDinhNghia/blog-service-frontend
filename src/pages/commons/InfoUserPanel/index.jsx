import React, { Component } from "react";
import { BsPersonWorkspace } from "react-icons/bs";
import "./index.css";
import { Link } from "react-router-dom";
import { routes } from "../../../constants/constant";

class InfoUserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data = {} } = this.props;
    return (
      <>
        <div className="InfoUserMenuHomePage">
          <span>
            <img
              src={`${data?.avatar || "/image/icon-login.png"}`}
              alt={`${data?.firstName || ""}`}
              className="PersonelAvatarLeftHomePage"
            />
            <Link
              to={{
                pathname: routes.PERSONEL,
              }}
              state={{ userId: data?.id }}
              className="LinkToPersonelLeftHomePage"
            >
              <h5 className="PersonelNameLeftHomePage">
                {`${data?.lastName || ""} ${data?.middleName || ""} ${
                  data?.firstName || ""
                } ${data?.code ? `- ${data?.code}` : ""}`}
              </h5>
            </Link>
            <p>Chức vụ: {data?.role?.toLowerCase()}</p>
          </span>
          <hr />
          <Link
            to={{
              pathname: routes.STUDY_SPACE,
            }}
            state={{ userId: data?.id }}
            className="LinkLeftHomePage"
          >
            <BsPersonWorkspace className="IconLeftHomePage" /> Không gian học tập
          </Link>
        </div>
        <hr />
      </>
    );
  }
}

export default InfoUserPanel;
