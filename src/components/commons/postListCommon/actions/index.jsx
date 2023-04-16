import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { postAction } from "../../../../store/action";
import "./index.css";

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
      isShowModalDelete: false,
    };
  }

  showModal() {
    this.setState({
      isShowModal: true,
    });
  }

  closeModal() {
    this.setState({
      isShowModal: false,
    });
  }

  showModalDelete() {
    this.setState({
      isShowModalDelete: true,
    });
  }

  closeModalDelete() {
    this.setState({
      isShowModalDelete: false,
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

  render() {
    const { postInfo = {}, currentUser = {} } = this.props;
    const { isShowModal, isShowModalDelete } = this.state;
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
                <BsFillPencilFill className="BtnHeaderMenuPostItem" />
                update post
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.showModalDelete()}
                className="ItemOptionHeaderPost"
              >
                <BsFillTrashFill className="BtnHeaderMenuPostItem" /> delete
                post
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
              <Form encType="multipart/form-data">
                <Form.Group role="form">
                  <Form.Label>Private mode options:</Form.Label>
                  <Form.Select
                    className="browser-default custom-select"
                    defaultValue={postInfo?.privateMode || false}
                    name="privateMode"
                    onChange={(event) => this.onChangePrivateMode(event)}
                  >
                    <option value={false}>false</option>
                    <option value={true}>true</option>
                  </Form.Select>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    placeholder="title new post..."
                    aria-label="title new post"
                    name="title"
                    defaultValue={postInfo?.title}
                    onChange={(event) => this.onChangeTitle(event)}
                  />
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    placeholder="type new post..."
                    aria-label="type new post"
                    as="textarea"
                    rows={5}
                    name="content"
                    defaultValue={postInfo?.content}
                    onChange={(event) => this.onChangeContent(event)}
                  />
                  <Form.Label>File upload</Form.Label>
                  <Form.Control
                    type="file"
                    multiple="multiple"
                    name="imageFile"
                    onChange={(event) => this.onChangeFile(event)}
                  />
                  <br />
                  <Button
                    variant="danger"
                    className="BtnCancleModalUpdatePost"
                    onClick={() => this.closeModal()}
                  >
                    Cancle
                  </Button>
                  <Button onClick={() => this.updatePost()}>Save</Button>
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal>

          <Modal
            show={isShowModalDelete}
            onHide={() => this.closeModalDelete(false)}
            size="sm"
          >
            <Modal.Body>
              <p>
                Hi {currentUser?.firstName}! Are you sure you want to delete
                this post "<b>{postInfo?.title}</b>"?
              </p>
              <Button
                variant="danger"
                className="BtnCancleModalUpdatePost"
                onClick={() => this.closeModalDelete()}
              >
                Cancle
              </Button>
              <Button onClick={() => this.deletePost()}>Ok</Button>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}

export default connect()(ActionPostItem);
