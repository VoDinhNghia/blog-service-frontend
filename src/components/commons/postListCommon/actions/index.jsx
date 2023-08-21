import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { postAction } from "../../../../store/action";
import "./index.css";
import { typeModal } from "../../../../common/constant";
import Select from "react-select";
import ImageUploadingPage from "../../ImageUploadingPage";
import { optionPrivateMode } from "../../../../utils/newPost";

class ActionPostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "default",
      title: "",
      privateMode: false,
      content: "",
      files: null,
      isShowModal: false,
      typeAction: "",
      images: [],
    };
  }

  showModal() {
    this.setState({
      isShowModal: true,
      typeAction: typeModal.UPDATE,
    });
  }

  closeModal() {
    this.setState({
      isShowModal: false,
    });
  }

  showModalDelete() {
    this.setState({
      isShowModal: true,
      typeAction: typeModal.DELETE,
    });
  }

  onChangePrivateMode(event) {
    this.setState({
      privateMode: event.target.value,
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

  async updatePost() {
    const { dispatch, postInfo = {} } = this.props;
    const { type, content, privateMode, title, files } = this.state;
    const formData = new FormData();
    formData.append("content", content || postInfo?.content);
    formData.append("type", type);
    if (files?.length > 0) {
      for (const img of files) {
        formData.append("imageFile", img);
      }
    }
    formData.append("privateMode", privateMode || postInfo?.privateMode);
    formData.append("title", title || postInfo?.title);
    dispatch({
      type: postAction.UPDATE_POST,
      id: postInfo?.id,
      payload: formData,
    });
    this.props.fetchPostList();
    this.setState({
      isShowModal: false,
      files: null,
    });
  }

  deletePost() {
    const { dispatch, postInfo } = this.props;
    dispatch({
      type: postAction.DELETE_POST,
      id: postInfo?.id,
    });
    this.props.fetchPostList();
    this.setState({
      isShowModalDelete: false,
    });
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
    const { postInfo = {}, currentUser = {} } = this.props;
    const { isShowModal, typeAction, images } = this.state;

    return (
      <>
        <div className="OptionsHeaderPostItem">
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className="OptionsHeaderIconPostItem"
              size="sm"
            ></Dropdown.Toggle>

            <Dropdown.Menu className="OptionsHeaderMenuPostItem">
              <Dropdown.Item
                onClick={() => this.showModal()}
                className="ItemOptionHeaderPost"
              >
                <BsPencilSquare className="BtnHeaderMenuPostItem" /> Chỉnh sửa
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.showModalDelete()}
                className="ItemOptionHeaderPost"
              >
                <BsTrash className="BtnHeaderMenuPostItem" /> Xóa bài đăng
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <Modal show={isShowModal} onHide={() => this.closeModal(false)}>
            <Modal.Header closeButton={true} className="HeaderModalUpdatePost">
              <Modal.Title className="TitlePostUpdate">
                {postInfo?.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {typeAction === typeModal.UPDATE ? (
                <Form encType="multipart/form-data">
                  <Form.Group role="form">
                    <Select
                      options={optionPrivateMode}
                      getOptionLabel={(e) => (
                        <span>
                          {e.icon} {e.label}
                        </span>
                      )}
                      defaultValue={optionPrivateMode?.find(
                        (op) =>
                          op.value === postInfo?.privateMode ||
                          op?.value === false
                      )}
                      onChange={(e) => this.onChangePrivateMode(e)}
                    />
                    <Form.Control
                      placeholder="Nhập tiêu đề bài đăng..."
                      aria-label="title new post"
                      defaultValue={postInfo?.title || null}
                      name="title"
                      className="mt-2"
                      onChange={(event) => this.onChangeTitle(event)}
                    />
                    <Form.Control
                      className="mb-2 mt-2"
                      placeholder="Nhập nội dung bài đăng..."
                      aria-label="type new post"
                      defaultValue={postInfo?.content || null}
                      as="textarea"
                      rows={5}
                      name="content"
                      onChange={(event) => this.onChangeContent(event)}
                    />{" "}
                    <ImageUploadingPage
                      images={images}
                      onChangeUpload={(imageList) =>
                        this.onChangeUpload(imageList)
                      }
                    />
                    <br />
                    <Button
                      variant="outline-danger"
                      className="BtnCancleModalUpdatePost"
                      onClick={() => this.closeModal()}
                      size="sm"
                    >
                      Hủy
                    </Button>{" "}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="BtnCancleModalUpdatePost"
                      onClick={() => this.updatePost()}
                    >
                      Lưu
                    </Button>{" "}
                  </Form.Group>
                </Form>
              ) : null}
              {typeAction === typeModal.DELETE ? (
                <>
                  <p>
                    Xin chào {currentUser?.firstName}! Bạn có chắc chắn muốn xóa
                    bài đăng này "<b>{postInfo?.title}</b>"?
                  </p>
                  <Button onClick={() => this.deletePost()}>Đồng ý</Button>
                  <Button
                    variant="danger"
                    className="BtnCancleModalUpdatePost"
                    onClick={() => this.closeModalDelete()}
                  >
                    Hủy
                  </Button>
                </>
              ) : null}
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}

export default connect()(ActionPostItem);
