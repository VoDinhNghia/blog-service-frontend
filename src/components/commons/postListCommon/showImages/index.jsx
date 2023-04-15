import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { postAction } from "../../../../store/action";
import "./index.css";

class ShowImagePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      isShowModalImg: false,
      imageUrl: "",
      imageId: "",
    };
  }

  showModal(url, id) {
    this.setState({
      isShowModalImg: true,
      imageUrl: url,
      imageId: id,
    });
  }

  closeModal() {
    this.setState({
      isShowModalImg: false,
    });
  }

  deleteImage(imageId) {
    const { dispatch, page, limit } = this.props;
    dispatch({
        type: postAction.DELETE_IMAGE_POST,
        id: imageId,
      });
      setTimeout(() => {
        dispatch({ type: postAction.GET_ALL_POST, payload: { page, limit } });
      }, 100);
    this.closeModal();
  }

  render() {
    const { imageLists = [], currentUser, userPostId } = this.props;
    const { isShowModalImg, imageUrl, imageId } = this.state;
    const isDeleted = currentUser === userPostId;
    return (
      <div>
        {imageLists.length > 0
          ? imageLists?.map((image, index) => {
              return (
                <span key={image?.id}>
                  <img
                    src={image?.url || ""}
                    alt={image?.originalname || ""}
                    className="ImagePostList"
                    onClick={() => this.showModal(image?.url, image?.id)}
                  />
                </span>
              );
            })
          : ""}
        <Modal show={isShowModalImg} onHide={() => this.closeModal(false)} size="lg">
          <div
            id="carouselExampleControls"
            class="carousel slide"
            data-mdb-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src={imageUrl}
                  class="d-block w-100"
                  alt="..."
                  height="500"
                />
              </div>
            </div>
          </div>
          <Modal.Footer>
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => this.closeModal()}
            >
              close
            </Button>
            {isDeleted ? (
              <Button
                size="sm"
                variant="danger"
                className="BtnDeleteImagePost"
                onClick={() => this.deleteImage(imageId)}
              >
                <BsFillTrashFill />
              </Button>
            ) : null}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect()(ShowImagePost);
