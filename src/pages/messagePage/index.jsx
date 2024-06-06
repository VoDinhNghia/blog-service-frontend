import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MessageLeftPage from "./leftPage";
import MessageRightPage from "./rightPage";
import FooterPage from "../commons/footer";
import { connect } from "react-redux";
import { messageAction } from "../../store/action.store";
import { socket } from "../../services/socket";
import { socketMesg } from "../../constants/constant";
import { getMessageNotRead } from "../../utils/message.util";
import MenuMain from "../menu";

class MessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: null,
    };
  }

  componentDidMount() {
    socket.connect();
    socket.on(socketMesg.MESSAGE_NEW, (data) => {
      if (data?.data) {
        this.fetchListMessage();
      }
    });
    this.fetchListMessage();
  }

  fetchListMessage() {
    const { dispatch } = this.props;
    dispatch({
      type: messageAction.GET_CONVERSATION_BY_USER,
    });
  }

  goToConversation(conver) {
    this.setState({
      conversation: conver,
    });
  }

  render() {
    const { newMessages = [] } = this.props;
    const { conversation } = this.state;
    const messageNotRead = getMessageNotRead(newMessages);

    return (
      <div>
        <MenuMain actionType="" payload={{}} title="Tìm kiếm bạn bè" />
        <Container className="mt-3 mb-3">
          <Row>
            <Col xl={3}>
              <MessageLeftPage
                messageNotRead={messageNotRead}
                fetchListMessage={() => this.fetchListMessage()}
                goToConversation={(conver) => this.goToConversation(conver)}
              />
            </Col>
            <Col xl={9}>
              <MessageRightPage
                messageNotRead={messageNotRead}
                conversation={conversation}
                fetchListMessage={() => this.fetchListMessage()}
                goToConversation={() => this.goToConversation(null)}
              />
            </Col>
          </Row>
        </Container>
        <FooterPage />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newMessages: state.MessageReducer.newMessages,
  };
};

export default connect(mapStateToProps)(MessagePage);
