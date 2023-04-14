import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/authService";
import {
  BsHouseFill,
  BsFillArrowRightSquareFill,
  BsBell,
  BsChatQuote,
} from "react-icons/bs";
import EventBus from "../../common/eventBus";
import { routes } from "../../common/constant";
import "./index.css";

class MenuMain extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      searchKey: null,
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
      <div className="navbar-nav ml-auto MenuMain">
        <li className="nav-item">
          <Link to={routes.HOME} className="nav-link">
            <BsHouseFill /> Home Page
          </Link>
        </li>
        <li className="nav-item">
          <a href={"not-yet"} className="nav-link">
            <BsChatQuote />
            <span className="NumberNotifyMenu">10</span>
          </a>
        </li>
        <li className="nav-item">
          <a href={"not-yet"} className="nav-link">
            <BsBell />
            <span className="NumberNotifyMenu">10</span>
          </a>
        </li>
        <li className="nav-item">
          <a href={routes.LOGIN} className="nav-link" onClick={this.logOut}>
            Log out <BsFillArrowRightSquareFill />
          </a>
        </li>
      </div>
    );
  }
}

export default MenuMain;
