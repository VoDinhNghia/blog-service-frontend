import React, { Component } from "react";
import { messageAction, postAction } from "../../../store/action";
import { connect } from "react-redux";
import MenuMain from "../menuMain";
import AuthService from "../../../services/authService";
import SearchMenuPageCommon from "../../commons/searchMenuPage";
import { Navbar } from "react-bootstrap";
import { getNumberMsgNotRead } from "../../../utils/messageHandle";
import { socket } from "../../../services/socket";
import { socketMesg } from "../../../common/constant";

class MenuPersonelPage extends Component {
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

  onChangeSearch(event) {
    const key = event.target.value;
    this.setState({
      searchKey: key,
    });
    this.searchPost();
  }

  searchPost() {
    const { dispatch, userId } = this.props;
    const { searchKey } = this.state;
    const currentUser = AuthService.getCurrentUser();
    setTimeout(() => {
      dispatch({
        type: postAction.GET_ALL_POST_PERSONEL,
        payload: { searchKey, userId: userId || currentUser?.id },
      });
    }, 100);
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
            title="Tìm kiếm bài đăng theo tiêu đề..."
            search={() => this.searchPost()}
            onChangeSearch={(e) => this.onChangeSearch(e)}
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          data-bs-target="#navbarScroll"
        />
        <MenuMain numberMsg={numberMsg}/>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newMessages: state.MessageReducer.newMessages,
  }
}

export default connect(mapStateToProps)(MenuPersonelPage);
