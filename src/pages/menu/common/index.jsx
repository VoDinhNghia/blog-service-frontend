import React, { Component } from "react";
import { messageAction } from "../../../store/action.store";
import { connect } from "react-redux";
import MenuMain from "../index";
import SearchMenuPageCommon from "../../commons/search";
import { Navbar } from "react-bootstrap";
import { getNumberMsgNotRead } from "../../../utils/message.util";
import { socket } from "../../../services/socket";
import { socketMesg } from "../../../constants/constant";

class MenuMainCommon extends Component {
  constructor(props) {
    super(props);
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
    const { newMessages = [], title = '' } = this.props;
    const numberMsg = getNumberMsgNotRead(newMessages);

    return (
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
        <MenuMain numberMsg={numberMsg} />
      </Navbar>
    );
  }
}

export default connect((state) => {
  return {
    newMessages: state.MessageReducer.newMessages,
  };
})(MenuMainCommon);
