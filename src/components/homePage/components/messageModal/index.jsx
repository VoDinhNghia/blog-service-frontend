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
import { formatTimeMessage, routes } from "../../../../common/constant";
import { connect } from "react-redux";
import { socket } from "../../../../services/socket";
import { messageAction } from "../../../../store/action";
import AuthService from "../../../../services/authService";
import moment from "moment/moment";

class MessageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      newMessage: null,
      limit: 10,
      page: 1,
    };
  }

  componentDidMount() {
    socket.connect();
    socket.on("message_new", (data) => {
      this.setState({
        newMessage: data?.data,
      });
    });
  }

  onChangeContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  async sendMessage() {
    const { dispatch, userInfo = {}, conversationInfo = {} } = this.props;
    if (!conversationInfo.id) {
      setTimeout(() => {
        dispatch({ type: messageAction.GET_ONE_CONVERSATION, chatWithId: userInfo?.id || 's' });
      }, 70);
    }
    const { content } = this.state;
    const payloadMessage = {
      content,
      userReviceId: userInfo?.id,
    };
    dispatch({
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
    const { newMessage, content } = this.state;
    const currentUser = AuthService.getCurrentUser();
    const listMessage =
      newMessage?.conversationId === conversationInfo?.id
        ? [...messages, newMessage]
        : [...messages];
    return (
      <>
        <Modal
          show={isShowModalMessage}
          onHide={() => this.props.closeModalMessage(false)}
          centered
          className="ModalMessage"
        >
          <MDBRow className="d-flex justify-content-center">
            <MDBCol>
              <MDBCard>
                <MDBCardHeader className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <Link to={routes.PERSONEL} state={{ userId: userInfo?.id }}>
                      {`${userInfo?.lastName || ""} ${
                        userInfo?.middleName || ""
                      } ${userInfo?.firstName || ""}`}
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
                    return (
                      <div key={message?.id}>
                        {message?.userSendId !== currentUser?.id ? (
                          <>
                            <div className="d-flex justify-content-between">
                              <p className="small mb-1">
                                <Link
                                  to={routes.PERSONEL}
                                  state={{ userId: userInfo?.id }}
                                >
                                  {`${userInfo?.lastName || ""} ${
                                    userInfo?.middleName || ""
                                  } ${userInfo?.firstName || ""}`}
                                </Link>{" "}
                                <span className="small mb-1 text-muted">
                                  {" "}
                                  -{" "}
                                  {moment(message?.createdAt).format(
                                    formatTimeMessage
                                  )}
                                </span>
                              </p>
                            </div>
                            <div className="d-flex flex-row justify-content-start">
                              <img
                                src="/image/icon-login.png"
                                alt="avatar 1"
                                className="IconAvatarMessage"
                              />
                              <div>
                                <p className="MessageContent">
                                  {message?.content}
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="d-flex justify-content-between">
                              <span className="small mb-1 text-muted"></span>
                              <p className="small mb-1">
                                <span className="small mb-1 text-muted">
                                  {moment(message?.createdAt).format(
                                    formatTimeMessage
                                  )}{" "}
                                  -{" "}
                                </span>
                                <Link
                                  to={routes.PERSONEL}
                                  state={{ userId: currentUser?.id }}
                                >
                                  {`${currentUser?.lastName || ""} ${
                                    currentUser?.middleName || ""
                                  } ${currentUser?.firstName || ""}`}
                                </Link>
                              </p>
                            </div>
                            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                              <div>
                                <p className="MessageContentOfMe">
                                  {message?.content}
                                </p>
                              </div>
                              <img
                                src="/image/icon-login.png"
                                alt="avatar 1"
                                className="IconAvatarMessage"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </MDBCardBody>
                <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                  <MDBInputGroup className="mb-0">
                    <input
                      className="form-control"
                      placeholder="Type message"
                      type="text"
                      value={content}
                      onChange={(event) => this.onChangeContent(event)}
                    />
                    <Button
                      variant="outline-primary"
                      onClick={() => this.sendMessage()}
                    >
                      send
                    </Button>
                  </MDBInputGroup>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    conversationInfo: state.MessageReducer.conversationInfo,
    messageConverList: state.MessageReducer.messageConverList,
  };
}
export default connect(mapStateToProps)(MessageModal);
