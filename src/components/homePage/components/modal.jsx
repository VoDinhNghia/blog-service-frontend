/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import "./index.css";

class ModalHomepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  render() {
    const { isShowModal = false, data = [] } = this.props;
    return (
      <div>
        <Modal
          show={isShowModal}
          closeButton={true}
          onHide={() => this.props.closeModal(false)}
        >
          <Modal.Header closeButton={true} className="HeaderModalHomePage">
            <Modal.Title>List user likes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {data?.map((lists) => {
              return (
                <span className="ModalUserLike">
                  <img src={lists?.user?.avatar || "/image/icon-login.png"} alt="" />
                  <a href="#">{`${lists?.user?.lastName || ""} ${
                  lists?.user?.middleName || ""
                  } ${lists?.user?.firstName || ""}`}</a>
                </span>
              );
            })}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ModalHomepage;
