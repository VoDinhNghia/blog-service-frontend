import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
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
    console.log(imageId);
    this.closeModal()
  }

  render() {
    const { imageLists = [] } = this.props;
    const { isShowModalImg, imageUrl, imageId } = this.state;
    return (
      <>
        {imageLists.length > 0
          ? imageLists?.map((image, index) => {
              return (
                <>
                  <img
                    key={`${image?.id}${index}`}
                    src={image?.url || ""}
                    alt={image?.originalname || ""}
                    height="200px"
                    width="250px"
                    onClick={() => this.showModal(image?.url, image?.id)}
                  />
                </>
              );
            })
          : ""}
        <Modal show={isShowModalImg} onHide={() => this.closeModal(false)}>
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
              variant="danger"
              className="BtnDeleteImagePost"
              onClick={() => this.deleteImage(imageId)}
            >
              <BsFillTrashFill />
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default connect()(ShowImagePost);
