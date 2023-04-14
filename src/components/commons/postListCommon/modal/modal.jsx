import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import "./index.css";
import { Link } from "react-router-dom";
import { routes } from "../../../../common/constant";

class ModalHomepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  render() {
    const { isShowModal = false, data = [], isPersonel } = this.props;
    return (
      <div>
        <Modal
          show={isShowModal}
          onHide={() => this.props.closeModal(false)}
        >
          <Modal.Header closeButton={true} className="HeaderModalHomePage">
            <Modal.Title className="TitleModalUserLike">List user likes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {data?.map((lists, index) => {
              return (
                <p className="ModalUserLike" key={`${lists?.id}${index}`}>
                  <span>
                    <img
                      src={lists?.user?.avatar || "/image/icon-login.png"}
                      alt=""
                    />
                    <Link
                      to={{
                        pathname: routes.PERSONEL,
                      }}
                      state={{ userId: lists?.user?.id }}
                      onClick={isPersonel ? () => window.location.reload() : null}
                    >{`${lists?.user?.lastName || ""} ${
                      lists?.user?.middleName || ""
                    } ${lists?.user?.firstName || ""}`}</Link>
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
