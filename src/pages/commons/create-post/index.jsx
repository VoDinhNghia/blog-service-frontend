import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import AuthService from "../../../services/auth.service";
import "./index.css";
import NewPostModal from "./components";
import { getUserName } from "../../../utils/util";

class NewPostCommon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowNewPost: false,
    };
  }

  render() {
    const { page, limit } = this.props;
    const { isShowNewPost } = this.state;
    const currentUser = AuthService.getCurrentUser();
    const userName = getUserName(currentUser);
    const { firstName = "", avatar = "" } = currentUser;
    return (
      <>
        <InputGroup className="PostHomePage">
          <Button
            onClick={() => this.setState({ isShowNewPost: true })}
            id="basic-addon-post-home"
            variant="light"
          >
            <img
              src={avatar || "/image/icon-login.png"}
              alt={firstName}
              className="PostHomePageAvatar"
            />
          </Button>
          <Form.Control
            className="InputNewPostHomePage"
            placeholder={`Xin chào ${userName}! Hôm nay, bạn muốn đăng gì?...`}
            aria-label="new post"
            aria-describedby="basic-addon-post-home"
            onClick={() => this.setState({ isShowNewPost: true })}
          />
        </InputGroup>
        <NewPostModal
          isShowNewPost={isShowNewPost}
          page={page}
          limit={limit}
          closeNewPost={(value) => this.setState({ isShowNewPost: false })}
        />
      </>
    );
  }
}

export default NewPostCommon;
