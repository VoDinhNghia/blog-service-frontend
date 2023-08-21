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
    const options = [
      {
        value: true,
        label: "Mọi người",
      },
      {
        value: false,
        label: "Riêng tư",
      },
    ];

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
                    <Form.Label>Lựa chọn chế độ xem:</Form.Label>
                    <Select
                      options={options}
                      defaultValue={options?.find(
                        (op) =>
                          op.value === postInfo?.privateMode ||
                          op?.value === false
                      )}
                      onChange={(e) => this.onChangePrivateMode(e)}
                    />
                    <Form.Label>Tiêu đề</Form.Label>
                    <Form.Control
                      placeholder="Nhập tiêu đề bài đăng..."
                      aria-label="title new post"
                      defaultValue={postInfo?.title || null}
                      name="title"
                      onChange={(event) => this.onChangeTitle(event)}
                    />
                    <Form.Label>Nội dung</Form.Label>
                    <Form.Control
                      className="mb-2"
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
                      variant="danger"
                      className="BtnCancleModalUpdatePost"
                      onClick={() => this.closeModal()}
                    >
                      Hủy
                    </Button>{" "}
                    <Button className="BtnCancleModalUpdatePost" onClick={() => this.updatePost()}>Lưu</Button>{" "}
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
