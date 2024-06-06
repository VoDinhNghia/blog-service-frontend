import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LeftContentMessagePage from "./left-content";
import RightContentMessagePage from "./right-content";
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
    this.dispatch = this.props.dispatch;
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
    this.dispatch({
      type: messageAction.GET_CONVERSATION_BY_USER,
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
              <LeftContentMessagePage
                messageNotRead={messageNotRead}
                fetchListMessage={() => this.fetchListMessage()}
                goToConversation={(conver) =>
                  this.setState({ conversation: conver })
                }
              />
            </Col>
            <Col xl={9}>
              <RightContentMessagePage
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

export default connect((state) => {
  return {
    newMessages: state.MessageReducer.newMessages,
  };
})(MessagePage);
