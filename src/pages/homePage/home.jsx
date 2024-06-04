import React, { Component } from "react";
import MenuHomePage from "../menuPage/menuHomePage/index";
import Footer from "../footerPage/footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RightHomePage from "./components/rightPage/rightPage";
import LeftHomePage from "./components/leftPage/leftPage";
import { connect } from "react-redux";
import { messageAction, userAction } from "../../store/action";
import { Container } from "react-bootstrap";
import { getNumberMsgNotRead } from "../../utils/message.util";
import { socket } from "../../services/socket";
import { socketMesg } from "../../constants/constant";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUserDisplay: [],
      userIdSearch: "",
      limit: 15,
      page: 1,
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
    this.fetchAllUsers();
    this.fetchNewMessage();
  }

  fetchAllUsers() {
    const { limit, page } = this.state;
    this.dispatch({ type: userAction.GET_ALL_USER, payload: { limit, page } });
  }

  fetchNewMessage() {
    this.dispatch({
      type: messageAction.GET_CONVERSATION_BY_USER,
    });
  }

  render() {
    const { userList = [], newMessages = [] } = this.props;
    const numberMsg = getNumberMsgNotRead(newMessages);

    return (
      <>
        <MenuHomePage numberMsg={numberMsg} />
        <Container>
          <Row>
            <Col xs lg="4">
              <LeftHomePage userList={userList} />
            </Col>
            <Col>
              <RightHomePage />
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default connect((state) => {
  return {
    userList: state.UserReducer.userList,
    newMessages: state.MessageReducer.newMessages,
  };
})(Home);
