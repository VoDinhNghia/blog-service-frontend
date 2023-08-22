import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar } from "react-bootstrap";
import { getNumberMsgNotRead } from "../../../utils/messageHandle";
import MenuMain from "../menuMain";
import SearchMenuPageCommon from "../../commons/searchMenuPage";
import { messageAction } from "../../../store/action";
import { socket } from "../../../services/socket";
import { socketMesg } from "../../../common/constant";

class MenuMessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: null,
    };
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

  searchUser() {
    alert("Chua lam");
  }

  onChangeSearchKey(e) {
    alert("Chua lam");
  }

  fetchNewMessage() {
    const { dispatch } = this.props;
    dispatch({
      type: messageAction.GET_CONVERSATION_BY_USER,
    });
  }

  render() {
    const { newMessages = [] } = this.props;
    const numberMsg = getNumberMsgNotRead(newMessages);

    return (
      <Navbar collapseOnSelect expand="sm" className="MenuMain">
        <Navbar.Brand>
          <SearchMenuPageCommon
            title="Tìm kiếm bạn bè"
            search={() => this.searchUser()}
            onChangeSearch={(e) => this.onChangeSearchKey(e)}
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

const mapStateToProps = (state) => {
  return {
    newMessages: state.MessageReducer.newMessages,
  };
};

export default connect(mapStateToProps)(MenuMessagePage);
