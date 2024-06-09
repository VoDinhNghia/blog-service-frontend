import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { postAction } from "../../../../store/action.store";
import Carousel from "react-bootstrap/Carousel";
import "./index.css";
import { FcNext, FcPrevious } from "react-icons/fc";

class ShowImagePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      isShowModalImg: false,
      imageId: "",
      indexImage: 0,
    };
    this.dispatch = this.props.dispatch;
  }

  showModal(id, index) {
    this.setState({
      isShowModalImg: true,
      imageId: id,
      indexImage: index,
    });
  }

  closeModal() {
    this.setState({
      isShowModalImg: false,
    });
  }

  deleteImage(imageId) {
    this.dispatch({
      type: postAction.DELETE_IMAGE_POST,
      id: imageId,
    });
    this.props.fetchPostList();
    this.closeModal();
  }

  render() {
    const { imageLists = [], isDeleted } = this.props;
    const { isShowModalImg, imageId, indexImage } = this.state;
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
                    onClick={() => this.showModal(image?.id, index)}
                  />
                </span>
              );
            })
          : ""}
        <Modal
          show={isShowModalImg}
          onHide={() => this.closeModal(false)}
          size="lg"
        >
          <Carousel
            prevLabel={null}
            nextLabel={null}
            nextIcon={
              <span
                className="NextIconViewImage"
                aria-hidden="true"
                onClick={() =>
                  this.setState({
                    indexImage: indexImage < imageLists.length - 1 ? indexImage + 1 : indexImage,
                  })
                }
              >
                <FcNext className="NextIcon" />
              </span>
            }
            prevIcon={
              <span
                className="NextIconViewImage"
                aria-hidden="true"
                onClick={() =>
                  this.setState({
                    indexImage: indexImage > 1 ? indexImage - 1 : 0,
                  })
                }
              >
                <FcPrevious className="NextIcon" />
              </span>
            }
            activeIndex={indexImage}
            indicators={false}
          >
            {imageLists?.map((img) => {
              return (
                <Carousel.Item key={img?.id}>
                  <img
                    className="d-block w-100"
                    src={img?.url}
                    alt="First slide"
                    height={500}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
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
