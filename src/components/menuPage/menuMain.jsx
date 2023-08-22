import React, { Component } from "react";
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
import { Nav, Navbar } from "react-bootstrap";

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

  async logOut() {
    await AuthService.logout();
    AuthService.removeSessionFrontend();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { numberMsg = 0 } = this.props;

    return (
      <Navbar.Collapse id="navbarScroll" className="MenuRight">
        <Nav className="me-auto">
          <Nav.Link href={routes.HOME} className="NavLinkMenu">
            <BsHouseFill /> Trang chủ
          </Nav.Link>
          <Nav.Link href="/" className="NavLinkMenu">
            <BsChatQuote />
            <span className="NumberNotifyMenu"> {numberMsg}</span>
          </Nav.Link>
          <Nav.Link href="/" className="NavLinkMenu">
            <BsBell />
            <span className="NumberNotifyMenu">10</span>
          </Nav.Link>
          <Nav.Link
            className="NavLinkMenu"
            href={routes.LOGIN}
            onClick={() => this.logOut()}
          >
            <BsFillArrowRightSquareFill /> Đăng xuất
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    );
  }
}

export default MenuMain;
