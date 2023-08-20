import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import "./index.css";
import AuthService from "../../../../services/authService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { createPost } from "../../../../services/postService";
import { postAction } from "../../../../store/action";
import { typePostListPage } from "../../../../common/constant";
import Select from "react-select";
import ImageUploading from "react-images-uploading";
import { BsCamera2, BsPencilSquare, BsTrash } from "react-icons/bs";
import { Col, Row } from "react-bootstrap";

class NewPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "default",
      title: "",
      privateMode: false,
      content: "",
      files: null,
      isUploadImages: false,
      images: [],
    };
  }

  onChangePrivateMode(event) {
    this.setState({
      privateMode: event.value,
    });
  }

  onChangeTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }

  onChangeContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  onChangeFile(event) {
    const fileList = event.target.files;
    const arrays = [];
    for (const img of fileList) {
      arrays.push(img);
    }
    this.setState({ files: arrays });
  }

  async createNewPost(userId) {
    const { type, content, privateMode, title, files } = this.state;
    const formData = new FormData();
    formData.append("content", content);
    formData.append("type", type);
    if (files?.length > 0) {
      for (const img of files) {
        formData.append("imageFile", img);
      }
    }
    formData.append("privateMode", privateMode);
    formData.append("title", title);
    await createPost(formData);
    this.fetchPostList(userId);
    this.setState({
      files: null,
      isUploadImages: false,
    });
    this.props.closeNewPost(false);
  }

  fetchPostList(userId) {
    const { dispatch, page, limit, typePage } = this.props;
    const isPersonel = typePostListPage.PERSONEL_PAGE === typePage;
    setTimeout(() => {
      if (isPersonel) {
        dispatch({
          type: postAction.GET_ALL_POST_PERSONEL,
          payload: { page, limit, userId },
        });
      } else {
        dispatch({
          type: postAction.GET_ALL_POST,
          payload: { page, limit },
        });
      }
    }, 100);
  }

  UploadImageAndSubmit() {
    this.setState({
      isUploadImages: true,
    });
  }

  onCloseModal() {
    this.setState({
      files: null,
      isUploadImages: false,
    });
    this.props.closeNewPost(false);
  }

  onChangeUpload(imageList) {
    this.setState({
      files: imageList?.map((image) => {
        return image?.file;
      }),
      images: imageList,
    });
  }

  render() {
    const { isShowNewPost = false } = this.props;
    const currentUser = AuthService.getCurrentUser();
    const { isUploadImages, images } = this.state;
    const options = [
      {
        value: true,
        label: "Riêng tư",
      },
      {
        value: true,
        label: "Mọi người",
      },
    ];

    return (
      <div>
        <Modal
          className="ModalNewPost"
          show={isShowNewPost}
          onHide={() => this.onCloseModal()}
        >
          <Modal.Header closeButton={true} className="HeaderModalHomePage">
            <Modal.Title className="TitleNewPost">
              Đăng bài viết mới
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form encType="multipart/form-data">
              <Form.Group role="form">
                {!isUploadImages ? (
                  <>
                    <Form.Label>Lựa chọn chế độ xem:</Form.Label>
                    <Select
                      options={options}
                      onChange={(e) => this.onChangePrivateMode(e)}
                    />
                    <Form.Label>Tiêu đề</Form.Label>
                    <Form.Control
                      placeholder="Nhập tiêu đề bài đăng..."
                      aria-label="title new post"
                      name="title"
                      onChange={(event) => this.onChangeTitle(event)}
                    />
                    <Form.Label>Nội dung</Form.Label>
                    <Form.Control
                      placeholder="Nhập nội dung bài đăng..."
                      aria-label="type new post"
                      as="textarea"
                      rows={5}
                      name="content"
                      onChange={(event) => this.onChangeContent(event)}
                    />{" "}
                  </>
                ) : null}
                {isUploadImages ? (
                  <>
                    <ImageUploading
                      multiple
                      value={images}
                      onChange={(imageList) => this.onChangeUpload(imageList)}
                      maxNumber={69}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        <div className="upload__image-wrapper">
                          <Button
                            style={isDragging ? { color: "red" } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                            variant="outline-primary"
                            size="sm"
                          >
                            <BsCamera2 /> Chọn ảnh
                          </Button>
                          &nbsp;
                          <Button
                            onClick={onImageRemoveAll}
                            variant="outline-danger"
                            size="sm"
                          >
                            <BsTrash /> Xóa tất cả ảnh
                          </Button>
                          <Row>
                            {imageList.map((image, index) => (
                              <Col xl={4} className="mt-2 mb-2">
                                <div key={index} className="image-item border">
                                  <img
                                    src={image["data_url"]}
                                    alt=""
                                    width="100%"
                                    height="120px"
                                  />
                                  <div className="image-item__btn-wrapper mt-1 mb-1 text-center">
                                    <Button
                                      onClick={() => onImageUpdate(index)}
                                      variant="outline-primary"
                                      size="sm"
                                    >
                                      <BsPencilSquare />
                                    </Button>{" "}
                                    <Button
                                      onClick={() => onImageRemove(index)}
                                      variant="outline-danger"
                                      size="sm"
                                    >
                                      <BsTrash />
                                    </Button>
                                  </div>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </div>
                      )}
                    </ImageUploading>
                  </>
                ) : null}
                <br />
                {isUploadImages ? (
                  <Button
                    className="BtnSubmitNewPost"
                    onClick={() => this.createNewPost(currentUser?.id)}
                  >
                    Đăng bài
                  </Button>
                ) : (
                  <Button
                    className="BtnSubmitNewPost"
                    variant="outline-primary"
                    onClick={() => this.UploadImageAndSubmit()}
                  >
                    Chọn ảnh và Đăng bài
                  </Button>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    typePage: state.PostReducer.typePage,
    userId: state.PostReducer.userId,
  };
}
export default connect(mapStateToProps)(NewPostModal);
