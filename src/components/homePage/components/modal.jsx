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
          onHide={() => this.props.closeModal(false)}
        >
          <Modal.Header closeButton={true} className="HeaderModalHomePage">
            <Modal.Title>List user likes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {data?.map((lists, index) => {
              return (
                <p className="ModalUserLike" key={`${lists?.id}${index}`}>
                  <span>
                    <img src={lists?.user?.avatar || "/image/icon-login.png"} alt="" />
                    <a href="#">{`${lists?.user?.lastName || ""} ${
                    lists?.user?.middleName || ""
                    } ${lists?.user?.firstName || ""}`}</a>
                  </span>
                </p>
              );
            })}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ModalHomepage;
