import React, { Component } from "react";
import { BsPersonWorkspace } from "react-icons/bs";
import "./index.css";
import { Link } from "react-router-dom";
import { routes } from "../../../constants/constant";
import { getUserName } from "../../../utils/util";

class InfoUserPanel extends Component {
  render() {
    const { data = {} } = this.props;
    const { avatar = "", firstName = "", id = "", code = "", role = "" } = data;
    return (
      <>
        <div className="InfoUserMenuHomePage">
          <span>
            <img
              src={`${avatar || "/image/icon-login.png"}`}
              alt={`${firstName}`}
              className="PersonelAvatarLeftHomePage"
            />
            <Link
              to={{
                pathname: routes.PERSONEL,
              }}
              state={{ userId: id }}
              className="LinkToPersonelLeftHomePage"
            >
              <h5 className="PersonelNameLeftHomePage">
                {`${getUserName(data)} - ${code}`}
              </h5>
            </Link>
            <p>Chức vụ: {role.toLowerCase()}</p>
          </span>
          <hr />
          <Link
            to={{
              pathname: routes.STUDY_SPACE,
            }}
            state={{ userId: id }}
            className="LinkLeftHomePage"
          >
            <BsPersonWorkspace className="IconLeftHomePage" /> Không gian học
            tập
          </Link>
        </div>
        <hr />
      </>
    );
  }
}

export default InfoUserPanel;
