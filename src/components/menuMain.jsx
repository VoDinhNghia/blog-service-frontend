import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/authService";
import { BsHouseFill, BsFillArrowRightSquareFill } from "react-icons/bs";
import EventBus from "../common/eventBus";
import { routes } from "../common/constant";
import "./index.css";

export default class MenuMain extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    return (
      <div className="MenuMain">
        <nav className="navbar navbar-expand">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={routes.HOME} className="nav-link">
                <BsHouseFill /> Trang chủ
              </Link>
            </li>
          </div>
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href={routes.LOGIN} className="nav-link" onClick={this.logOut}>
                Đăng xuất <BsFillArrowRightSquareFill />
              </a>
            </li>
          </div>
        </nav>
      </div>
    );
  }
}
