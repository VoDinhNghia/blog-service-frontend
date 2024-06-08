import React, { Component } from "react";
import "./index.css";
import { Modal, Button } from "react-bootstrap";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { routes, socketMesg } from "../../../../constants/constant";
import { connect } from "react-redux";
import { socket } from "../../../../services/socket";
import { messageAction } from "../../../../store/action.store";
import AuthService from "../../../../services/auth.service";
import _ from "lodash";
import {
  getOneConversation,
  displayContentMess,
  displayContentMessFriend,
} from "../../../../utils/message.util";
import { getUserName } from "../../../../utils/util";

class MessageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      newMessage: null,
      limit: 10,
      page: 1,
      listMessages: [],
    };
    this.dispatch = this.props.dispatch;
  }

  componentDidMount() {
    socket.connect();
    socket.on(socketMesg.MESSAGE_NEW, (data) => {
      this.setState({
        newMessage: data?.data,
        listMessages: [...this.state.listMessages, data?.data],
      });
    });
  }

  onChangeContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  onViewMessage() {
    this.dispatch({
      type: messageAction.UPDATE_STATUS_MESSAGE,
      id: this.props?.conversationInfo?.id,
    });
  }

  closeModal() {
    this.setState({
      newMessage: null,
    });
    this.props.closeModalMessage(false);
  }

  async sendMessage() {
    const { userInfo = {}, conversationInfo = {} } = this.props;
    if (!conversationInfo.id) {
      getOneConversation(
        this.dispatch,
        messageAction.GET_ONE_CONVERSATION,
        userInfo?.id
      );
    }
    const payloadMessage = {
      content: this.state.content,
      userReviceId: userInfo?.id,
    };
    this.dispatch({
      type: messageAction.SEND_MESSAGE,
      payload: { ...payloadMessage },
    });
    this.setState({
      content: "",
    });
  }

  render() {
    const {
      isShowModalMessage,
      userInfo = {},
      messages = [],
      conversationInfo = {},
    } = this.props;
    const { newMessage, content, listMessages } = this.state;
    const currentUser = AuthService.getCurrentUser();
    const pushNewMessage =
      newMessage && newMessage?.conversationId === conversationInfo?.id
        ? [...messages, ...listMessages]
        : [...messages];
    const listMessage = _.uniqBy(pushNewMessage, "id");
    const bodyContentModal = (
      <MDBRow className="d-flex justify-content-center">
        <MDBCol>
          <MDBCard>
            <MDBCardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <Link to={routes.PERSONEL} state={{ userId: userInfo?.id }}>
                  {getUserName(userInfo)}
                </Link>
              </h5>
              <div className="d-flex flex-row align-items-center">
                <Button
                  size="sm"
                  variant="outline-light"
                  onClick={() => this.props.closeModalMessage(false)}
                  className="BtnCloseModal"
                >
                  x
                </Button>
              </div>
            </MDBCardHeader>
            <MDBCardBody className="ScrollBodyModal">
              {listMessage?.map((message) => {
                const { createdAt = "", content = "" } = message;
                return (
                  <div key={message?.id}>
                    {message?.userSendId !== currentUser?.id
                      ? displayContentMessFriend(content, createdAt, userInfo)
                      : displayContentMess(content, createdAt)}
                  </div>
                );
              })}
            </MDBCardBody>
            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
              <MDBInputGroup className="mb-0">
                <input
                  className="form-control"
                  placeholder="Viết tin nhắn..."
                  type="text"
                  value={content}
                  onClick={() => this.onViewMessage()}
                  onChange={(event) => this.onChangeContent(event)}
                />
                <Button
                  variant="outline-primary"
                  onClick={() => this.sendMessage()}
                >
                  gửi
                </Button>
              </MDBInputGroup>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );

    return (
      <>
        <Modal
          show={isShowModalMessage}
          onHide={() => this.closeModal()}
          centered
          className="ModalMessage"
        >
          {bodyContentModal}
        </Modal>
      </>
    );
  }
}

export default connect((state) => {
  return {
    conversationInfo: state.MessageReducer.conversationInfo,
    messageConverList: state.MessageReducer.messageConverList,
  };
})(MessageModal);
