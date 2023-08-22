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
import { socket } from "../../services/socket";
import { connect } from "react-redux";
import { messageAction } from "../../store/action";

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
    socket.connect();
    socket.on("message_new", (data) => {
      this.fetchNewMessage();
    });
    EventBus.on("logout", () => {
      this.logOut();
    });
    this.fetchNewMessage();
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  fetchNewMessage() {
    const { dispatch } = this.props;
    dispatch({
      type: messageAction.GET_CONVERSATION_BY_USER,
    });
  }

  async logOut() {
    await AuthService.logout();
    AuthService.removeSessionFrontend();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { newMessages = [] } = this.props;
    const { currentUser } = this.state;
    const listMsgNotRead = newMessages?.filter((msg) =>
      msg?.messages?.find(
        (m) => m?.userSendId !== currentUser?.id && !m?.status
      )
    );

    return (
      <Navbar.Collapse id="navbarScroll" className="MenuRight">
        <Nav className="me-auto">
          <Nav.Link href={routes.HOME} className="NavLinkMenu">
            <BsHouseFill /> Trang chủ
          </Nav.Link>
          <Nav.Link href="/" className="NavLinkMenu">
            <BsChatQuote />
            <span className="NumberNotifyMenu"> {listMsgNotRead?.length}</span>
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

const mapStateToProps = (state) => {
  return {
    newMessages: state.MessageReducer.newMessages,
  };
};

export default connect(mapStateToProps)(MenuMain);
