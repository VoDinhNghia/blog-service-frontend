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

class NewPostModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      limit: 10,
      type: "default",
      title: "",
      privateMode: false,
      content: "",
      files: null,
    };
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

  async createNewPost(isPersonel, userId) {
    const { dispatch } = this.props;
    const { type, content, privateMode, title, limit, page, files } =
      this.state;
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
    setTimeout(() => {
      if (isPersonel) {
        dispatch({
          type: postAction.GET_ALL_POST_PERSONEL,
          payload: { page, limit, userId: userId },
        });
      } else {
        dispatch({
          type: postAction.GET_ALL_POST,
          payload: { page, limit },
        });
      }
    }, 100);
    this.setState({
      files: null,
    });
    this.props.closeNewPost(false);
  }

  render() {
    const { isShowNewPost = false, type } = this.props;
    const currentUser = AuthService.getCurrentUser();
    const isPersonel = typePostListPage.PERSONEL_PAGE === type;

    return (
      <div>
        <Modal
          className="ModalNewPost"
          show={isShowNewPost}
          onHide={() => this.props.closeNewPost(false)}
        >
          <Modal.Header closeButton={true} className="HeaderModalHomePage">
            <Modal.Title className="TitleNewPost">
              Hi{" "}
              {`${currentUser?.lastName || ""} ${
                currentUser?.middleName || ""
              } ${currentUser?.firstName || ""}`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form encType="multipart/form-data">
              <Form.Group role="form">
                <Form.Label>Private mode options:</Form.Label>
                <Form.Select
                  className="browser-default custom-select"
                  defaultValue={false}
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
                  onChange={(event) => this.onChangeTitle(event)}
                />
                <Form.Label>Content</Form.Label>
                <Form.Control
                  placeholder="type new post..."
                  aria-label="type new post"
                  as="textarea"
                  rows={5}
                  name="content"
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
                  className="BtnSubmitNewPost"
                  onClick={() => this.createNewPost(isPersonel, currentUser?.id)}
                >
                  Save
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default connect()(NewPostModal);
