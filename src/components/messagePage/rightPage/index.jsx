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
import { messageAction } from "../../../store/action";

class MessageRightPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }
  
  onViewMessage() {
    const { dispatch } = this.props;
    dispatch({
      type: messageAction.UPDATE_STATUS_MESSAGE,
      id: "",
    });
  }

  onChangeMessage(e) {
    this.setState({
      message: e?.target?.value,
    });
  }

  render() {
    const { message } = this.state;

    return (
      <div>
        <MDBRow className="d-flex justify-content-between">
          <MDBCol>
            <MDBCard>
              <MDBCardHeader className="d-flex justify-content-between">
                <h5>
                  <Link>Vo Dinh Nghia</Link>
                </h5>
              </MDBCardHeader>
              <MDBCardBody>
                <div className="d-flex justify-content-between">
                  <p className="small mb-1">
                    <Link>You</Link> -
                    <span className="small mb-1 text-muted">
                      2023-08-23 08:00:00 am
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
                    <p className="MessageContentOfMe">Your content message</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <span className="small mb-1 text-muted"></span>
                  <p className="small mb-1"></p>
                  <span className="small mb-1 text-muted">
                    2023-08-23 08:00:00 am - <Link>Vo Dinh Nghia</Link>
                  </span>
                </div>
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                  <div>
                    <p className="MessageContent">content message</p>
                  </div>
                  <img
                    src="/image/icon-login.png"
                    alt="avatar 1"
                    className="IconAvatarMessage"
                  />
                </div>
              </MDBCardBody>
              <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                <MDBInputGroup className="mb-0">
                  <input
                    className="form-control"
                    placeholder="Viết tin nhắn..."
                    type="text"
                    value={message}
                    onClick={() => this.onViewMessage()}
                    onChange={(event) => this.onChangeMessage(event)}
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
      </div>
    );
  }
}

export default connect()(MessageRightPage);
