import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import AuthService from "../../../services/authService";
import "./index.css";
import NewPostModal from "./components";

class NewPostCommon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 50,
      isShowNewPost: false,
    };
  }

  showNewPost() {
    this.setState({
      isShowNewPost: true,
    });
  }

  closeNewPost(value) {
    this.setState({
      isShowNewPost: value,
    });
  }

  render() {
    const { type } = this.props;
    const { isShowNewPost } = this.state;
    const currentUser = AuthService.getCurrentUser();

    return (
      <>
        <InputGroup className="PostHomePage">
          <Button
            onClick={() => this.showNewPost()}
            id="basic-addon-post-home"
            variant="light"
          >
            <img
              src={currentUser?.avatar || "/image/icon-login.png"}
              alt={currentUser?.firstName}
              className="PostAvatar"
            />
          </Button>
          <Form.Control
            className="InputNewPostHomePage"
            placeholder={`Hi ${currentUser?.lastName || ""} ${
              currentUser?.middleName || ""
            } ${currentUser?.firstName || ""}! write something new post...`}
            aria-label="new post"
            aria-describedby="basic-addon-post-home"
            onClick={() => this.showNewPost()}
          />
        </InputGroup>
        <NewPostModal
          isShowNewPost={isShowNewPost}
          type={type}
          closeNewPost={(value) => this.closeNewPost(value)}
        />
      </>
    );
  }
}

export default NewPostCommon;
