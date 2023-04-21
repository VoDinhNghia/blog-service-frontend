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
import { routes } from "../../../../common/constant";

class MessageModal extends Component {
  render() {
    const { isShowModalMessage, userInfo = {} } = this.props;

    return (
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
              <MDBCardBody>
                <div className="d-flex justify-content-between">
                  <p className="small mb-1">
                    <Link to={routes.PERSONEL} state={{ userId: userInfo?.id }}>
                      {`${userInfo?.lastName || ""} ${
                        userInfo?.middleName || ""
                      } ${userInfo?.firstName || ""}`}
                    </Link>{" "}
                    <span className="small mb-1 text-muted">
                      {" "}
                      - 21 April 4:05 pm
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
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <span className="small mb-1 text-muted"></span>
                  <p className="small mb-1">
                    <span className="small mb-1 text-muted">
                      21 April 4:05 pm -{" "}
                    </span>
                    <Link to={routes.PERSONEL} state={{ userId: userInfo?.id }}>
                      {`${userInfo?.lastName || ""} ${
                        userInfo?.middleName || ""
                      } ${userInfo?.firstName || ""}`}
                    </Link>
                  </p>
                </div>
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                  <div>
                    <p className="MessageContentOfMe">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry
                    </p>
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
                    placeholder="Type message"
                    type="text"
                  />
                  <Button variant="outline-primary">send</Button>
                </MDBInputGroup>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </Modal>
    );
  }
}

export default MessageModal;
