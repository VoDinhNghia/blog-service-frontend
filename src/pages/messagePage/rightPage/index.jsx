import React, { Component } from "react";
import "./index.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCol,
  MDBInputGroup,
  MDBRow,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { messageAction } from "../../../store/action.store";
import AuthenService from "../../../services/auth.service";
import { formatTimeMessage, routes } from "../../../constants/constant";
import moment from "moment/moment";

class MessageRightPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  sendMessage(userInfo) {
    const { dispatch, conversation = {} } = this.props;
    const { message } = this.state;
    const payloadMsg = {
      content: message,
      userReviceId: userInfo?.id,
    };

    dispatch({
      type: messageAction.SEND_MESSAGE,
      payload: { ...payloadMsg },
    });
    dispatch({
      type: messageAction.UPDATE_STATUS_MESSAGE,
      id: conversation?.id,
    });
    this.props.fetchListMessage();
    this.props.goToConversation(null);
  }

  onChangeMessage(e) {
    this.setState({
      message: e?.target?.value,
    });
  }

  render() {
    const { conversation, messageNotRead = [] } = this.props;
    const { message } = this.state;
    const currentUser = AuthenService.getCurrentUser();
    const userInfo =
      conversation?.user?.id === currentUser?.id
        ? conversation?.chatWith
        : conversation?.user;

    return (
      <div>
        {conversation ? (
          <MDBRow className="d-flex justify-content-between">
            <MDBCol>
              <MDBCard>
                <MDBCardHeader className="d-flex justify-content-between">
                  <h5>
                    <Link
                      to={{ pathname: routes.PERSONEL }}
                      state={{ userId: userInfo?.id }}
                    >
                      {`${userInfo?.lastName} ${userInfo?.middleName} ${userInfo?.firstName}`}
                    </Link>
                  </h5>
                </MDBCardHeader>
                <MDBCardBody>
                  {conversation?.messages?.map((msg) => {
                    return (
                      <div key={msg?.id}>
                        {msg?.userSendId === currentUser?.id ? (
                          <>
                            <div className="d-flex justify-content-between">
                              <p className="small mb-1">
                                <Link
                                  to={{ pathname: routes.PERSONEL }}
                                  state={{ userId: currentUser?.id }}
                                >
                                  You
                                </Link>{" "}
                                -
                                <span className="small mb-1 text-muted">
                                  {moment(msg?.createdAt).format(
                                    formatTimeMessage
                                  )}
                                </span>
                              </p>
                            </div>
                            <div className="d-flex flex-row justify-content-start mb-4 pt-1">
                              <img
                                src="/image/icon-login.png"
                                alt="avatar 1"
                                className="IconAvatarMessage"
                              />
                              <div>
                                <p className="MessageContentOfMe">
                                  {msg?.content}
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="d-flex justify-content-between">
                              <span className="small mb-1 text-muted"></span>
                              <p className="small mb-1"></p>
                              <span className="small mb-1 text-muted">
                                {moment(msg?.createdAt).format(
                                  formatTimeMessage
                                )}{" "}
                                -{" "}
                                <Link
                                  to={{ pathname: routes.PERSONEL }}
                                  state={{ userId: userInfo?.id }}
                                >{`${userInfo?.lastName} ${userInfo?.middleName} ${userInfo?.firstName}`}</Link>
                              </span>
                            </div>
                            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                              <div>
                                <p className="MessageContent">{msg?.content}</p>
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
                      placeholder="Viết tin nhắn..."
                      type="text"
                      value={message}
                      onChange={(event) => this.onChangeMessage(event)}
                    />
                    <Button
                      variant="outline-primary"
                      onClick={() => this.sendMessage(userInfo)}
                    >
                      gửi
                    </Button>
                  </MDBInputGroup>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        ) : messageNotRead?.length > 0 ? (
          "Vui lòng chọn tin nhắn bên trái để xem chi tiết"
        ) : (
          "Bạn không có tin nhắn mới"
        )}
      </div>
    );
  }
}

export default connect()(MessageRightPage);
