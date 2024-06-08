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
import { routes } from "../../../constants/constant";
import { getUserName } from "../../../utils/util";
import {
  displayContentMess,
  displayContentMessFriend,
} from "../../../utils/message.util";

class RightContentMessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
    this.dispatch = this.props.dispatch;
  }

  sendMessage(userInfo) {
    const { conversation = {} } = this.props;
    const { message } = this.state;
    const payloadMsg = {
      content: message,
      userReviceId: userInfo?.id,
    };

    this.dispatch({
      type: messageAction.SEND_MESSAGE,
      payload: { ...payloadMsg },
    });
    this.dispatch({
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
    const { user = {}, chatWith = {} } = conversation ?? {};
    const userInfo = user?.id === currentUser?.id ? chatWith : user;

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
                      {getUserName(userInfo)}
                    </Link>
                  </h5>
                </MDBCardHeader>
                <MDBCardBody>
                  {conversation.messages?.map((msg) => {
                    const {
                      id = "",
                      userSendId = "",
                      createdAt = "",
                      content = "",
                    } = msg;
                    return (
                      <div key={id}>
                        {userSendId === currentUser?.id
                          ? displayContentMess(content, createdAt)
                          : displayContentMessFriend(
                              content,
                              createdAt,
                              userInfo
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

export default connect()(RightContentMessagePage);
