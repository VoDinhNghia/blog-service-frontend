import React, { Component } from "react";
import moment from "moment/moment";
import { connect } from "react-redux";
import { postAction } from "../../../../../store/action";
import {
  BsFillHandThumbsUpFill,
  BsFillChatLeftTextFill,
  BsFillReplyFill,
} from "react-icons/bs";
import "./index.css";
import ModalHomepage from "../../modal/modal";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import AuthService from "../../../../../services/authService";
import ShowCommentHomePage from "./components/showComment";
import ActionPostItem from "./actions/action";
import ShowImagePost from "./showImagesPost/showImages";

class PostListHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      userLikes: [],
      openedCommentId: null,
      commentPost: "",
    };
  }

  showModal(data) {
    this.setState({
      isShowModal: true,
      userLikes: data,
    });
  }

  closeModal(value) {
    this.setState({
      isShowModal: value,
    });
  }

  actionLike(postId) {
    const { dispatch, page, limit } = this.props;
    dispatch({ type: postAction.LIKE_POST, payload: { postId } });
    setTimeout(() => {
      dispatch({ type: postAction.GET_ALL_POST, payload: { page, limit } });
    }, 100);
  }

  actionShare(postId) {
    const { dispatch } = this.props;
    const { page, limit } = this.state;
    dispatch({
      type: postAction.SHARE_POST,
      payload: { postId, privateMode: false },
    });
    setTimeout(() => {
      dispatch({ type: postAction.GET_ALL_POST, payload: { page, limit } });
    }, 100);
  }

  showComment(postId) {
    const { openedCommentId } = this.state;
    if (openedCommentId !== postId) {
      this.setState({
        openedCommentId: postId,
      });
    } else {
      this.setState({
        openedCommentId: null,
      });
    }
  }

  onchangeValueComment(event) {
    this.setState({
      commentPost: event.target.value,
    });
  }

  sendComment(event, postId) {
    const { commentPost, limit, page } = this.state;
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch({
      type: postAction.COMMENT_POST,
      payload: { postId, content: commentPost },
    });
    setTimeout(() => {
      dispatch({ type: postAction.GET_ALL_POST, payload: { page, limit } });
    }, 100);
  }

  render() {
    const { postLists = [], page, limit } = this.props;
    const { isShowModal, userLikes, openedCommentId } = this.state;
    const currentUser = AuthService.getCurrentUser();
    return (
      <>
        {postLists?.map((post, index) => {
          return (
            <div className="PostItem" key={`${post?.id}${index}`}>
              <span>
                <img
                  src={post?.user?.avatar || "/image/icon-login.png"}
                  alt={post?.user?.firstName}
                  className="PostAvatar"
                />
                {currentUser.id === post?.user?.id ? (
                  <ActionPostItem
                    postInfo={post}
                    currentUser={currentUser}
                    limit={limit}
                    page={page}
                  />
                ) : (
                  ""
                )}
                <h5>
                  {`${post?.user?.lastName || ""} ${
                    post?.user?.middleName || ""
                  } ${post?.user?.firstName || ""}`}
                  <p>
                    {post?.createdAt
                      ? moment(post?.createdAt).format("YYYY-MM-DD hh:mm:ss")
                      : ""}
                  </p>
                </h5>
              </span>
              <p className="TitlePost">{post?.title || ""}</p>
              <p className="ContentPostHomePage">
                {post?.content?.split("\r\n")?.map((content) => {
                  return <p>&emsp;{content}</p>;
                })}
              </p>
              <ShowImagePost
                imageLists={post?.attachments}
                currentUser={currentUser?.id}
                userPostId={post?.user?.id}
                page={page}
                limit={limit}
              />
              <p className="NumberLikeShareComment">
                <Button
                  className="NumberLike"
                  variant="outline-light"
                  onClick={() => this.showModal(post?.likes || [])}
                >
                  <BsFillHandThumbsUpFill /> {post?.likes?.length}
                </Button>{" "}
                <span className="NumberCommentShare">
                  <Button
                    className="NumberComment"
                    variant="outline-light"
                    aria-expanded={openedCommentId === post?.id}
                    onClick={() => this.showComment(post?.id)}
                  >
                    <BsFillChatLeftTextFill /> {post?.comments?.length}
                  </Button>{" "}
                  <Button className="NumberShare" variant="outline-light">
                    <BsFillReplyFill />
                    {post?.shares?.length}
                  </Button>
                </span>
              </p>
              <br />
              <hr />
              <p className="LikeShareComment">
                <Button
                  className="ButtonLSC"
                  variant="outline-light"
                  onClick={() => this.actionLike(post?.id)}
                  style={
                    post?.likes?.find((p) => p?.user?.id === currentUser?.id)
                      ? { color: "blue" }
                      : {}
                  }
                >
                  <BsFillHandThumbsUpFill /> like
                </Button>
                <Button
                  className="ButtonLSC"
                  variant="outline-light"
                  aria-expanded={openedCommentId === post?.id}
                  onClick={() => this.showComment(post?.id)}
                >
                  <BsFillChatLeftTextFill /> comment
                </Button>{" "}
                <Button
                  className="ButtonLSC"
                  variant="outline-light"
                  onClick={() => this.actionShare(post?.id)}
                  disabled={currentUser?.id === post?.user?.id ? true : false}
                  style={
                    currentUser?.id === post?.user?.id ? { color: "gray" } : {}
                  }
                >
                  <BsFillReplyFill /> share
                </Button>
              </p>
              <Collapse in={openedCommentId === post?.id}>
                <div>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="write something comments..."
                      aria-label="comment post"
                      aria-describedby="basic-addon-comment-post"
                      onChange={(event) => this.onchangeValueComment(event)}
                    />
                    <Button
                      id="basic-addon-comment-post"
                      variant="light"
                      onClick={(event) => this.sendComment(event, post?.id)}
                    >
                      send
                    </Button>
                  </InputGroup>
                  <ShowCommentHomePage
                    commentList={post?.comments || []}
                    key={`${post?.id}comment`}
                  />
                </div>
              </Collapse>
            </div>
          );
        })}
        <ModalHomepage
          data={userLikes}
          isShowModal={isShowModal}
          closeModal={(value) => this.closeModal(value)}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    postLists: state.PostReducer.postLists,
    total: state.PostReducer.total,
  };
}

export default connect(mapStateToProps)(PostListHomePage);
