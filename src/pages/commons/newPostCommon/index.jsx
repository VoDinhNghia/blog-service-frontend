import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import AuthService from "../../../services/auth.service";
import "./index.css";
import NewPostModal from "./components";

class NewPostCommon extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { page, limit } = this.props;
    const { isShowNewPost } = this.state;
    const currentUser = AuthService.getCurrentUser();
    const userName = `${currentUser.lastName || ""} ${currentUser.middleName || ""} ${currentUser.firstName || ""}`;
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
              className="PostHomePageAvatar"
            />
          </Button>
          <Form.Control
            className="InputNewPostHomePage"
            placeholder={`Xin chào ${userName}! Hôm nay, bạn muốn đăng gì?...`}
            aria-label="new post"
            aria-describedby="basic-addon-post-home"
            onClick={() => this.showNewPost()}
          />
        </InputGroup>
        <NewPostModal
          isShowNewPost={isShowNewPost}
          page={page}
          limit={limit}
          closeNewPost={(value) => this.closeNewPost(value)}
        />
      </>
    );
  }
}

export default NewPostCommon;
