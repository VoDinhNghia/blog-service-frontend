import React, { Component } from "react";
import { connect } from "react-redux";
import MenuMain from "../menuMain";
import { messageAction, studySpaceAction } from "../../../store/action.store";
import SearchMenuPageCommon from "../../commons/searchMenuPage";
import { Navbar } from "react-bootstrap";
import { getNumberMsgNotRead } from "../../../utils/message.util";
import { socket } from "../../../services/socket";
import { socketMesg } from "../../../constants/constant";

class MenuStudySpacePage extends Component {
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
    this.searchGroup();
  }

  searchGroup() {
    const { dispatch, userId } = this.props;
    const { searchKey } = this.state;
    setTimeout(() => {
      dispatch({
        type: studySpaceAction.GET_ALL_GROUP,
        payload: { createdById: userId, searchKey },
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
            title="Tìm kiếm nhóm theo tiêu đề..."
            onChangeSearch={(e) => this.onChangeSearch(e)}
            search={() => this.searchGroup()}
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

export default connect(mapStateToProps)(MenuStudySpacePage);
