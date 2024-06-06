import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import {
  BsHouseFill,
  BsFillArrowRightSquareFill,
  BsBell,
  BsChatQuote,
} from "react-icons/bs";
import EventBus from "../../services/event-bus.service";
import { routes, socketMesg } from "../../constants/constant";
import "./index.css";
import { Nav, Navbar } from "react-bootstrap";
import { messageAction } from "../../store/action.store";
import { connect } from "react-redux";
import SearchMenuPageCommon from "../commons/search";
import { getNumberMsgNotRead } from "../../utils/message.util";
import { socket } from "../../services/socket";

class MenuMain extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      searchKey: null,
    };
    this.dispatch = this.props.dispatch;
  }

  componentDidMount() {
    socket.connect();
    socket.on(socketMesg.MESSAGE_NEW, (data) => {
      if (data?.data) {
        this.fetchNewMessage();
      }
    });
    this.fetchNewMessage();
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
  }

  fetchNewMessage() {
    const { dispatch } = this.props;
    dispatch({
      type: messageAction.GET_CONVERSATION_BY_USER,
    });
  }

  onChangeSearch(event) {
    const key = event.target.value;
    this.setState({
      searchKey: key,
    });
    this.onSearch();
  }

  onSearch() {
    const { actionType, payload = {} } = this.props;
    const { searchKey } = this.state;
    setTimeout(() => {
      this.dispatch({
        type: actionType,
        payload: { ...payload, searchKey },
      });
    }, 100);
  }

  render() {
    const { newMessages = [], title = "" } = this.props;
    const numberMsg = getNumberMsgNotRead(newMessages);

    return (
      <div>
        <Navbar collapseOnSelect expand="sm" className="MenuMain">
          <Navbar.Brand>
            <SearchMenuPageCommon
              title={title}
              search={() => this.onSearch()}
              onChangeSearch={(e) => this.onChangeSearch(e)}
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            data-bs-target="#navbarScroll"
          />
          <Navbar.Collapse id="navbarScroll" className="MenuRight">
            <Nav className="me-auto">
              <Nav.Link href={routes.HOME} className="NavLinkMenu">
                <BsHouseFill /> Trang chủ
              </Nav.Link>
              <Nav.Link href={routes.MESSAGE_PAGE} className="NavLinkMenu">
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
        </Navbar>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    newMessages: state.MessageReducer.newMessages,
  };
})(MenuMain);
