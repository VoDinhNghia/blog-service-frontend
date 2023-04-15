import React, { Component } from "react";
import moment from "moment/moment";
import { connect } from "react-redux";
import { postAction } from "../../../store/action";
import {
  BsFillHandThumbsUpFill,
  BsFillChatLeftTextFill,
  BsFillReplyFill,
} from "react-icons/bs";
import "./index.css";
import ModalHomepage from "./modal/modal";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import AuthService from "../../../services/authService";
import ShowCommentHomePage from "./comments";
import ActionPostItem from "./actions";
import ShowImagePost from "./showImages";
import { routes, typePostListPage } from "../../../common/constant";
import { Link } from "react-router-dom";

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

  actionLike(postId, isPersonel, userId) {
    const { dispatch, page, limit } = this.props;
    dispatch({ type: postAction.LIKE_POST, payload: { postId } });
    setTimeout(() => {
      dispatch({ type: postAction.GET_ALL_POST, payload: { page, limit, userId: isPersonel ? userId : null } });
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

  sendComment(event, postId, isPersonel, userId) {
    const { commentPost, limit, page } = this.state;
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch({
      type: postAction.COMMENT_POST,
      payload: { postId, content: commentPost },
    });
    setTimeout(() => {
      dispatch({
        type: postAction.GET_ALL_POST,
        payload: { page, limit, userId: isPersonel ? userId : null },
      });
    }, 100);
  }

  goToUserDetailPage(user) {
    const { dispatch } = this.props; 
    dispatch({
      type: postAction.GET_ALL_POST_PERSONEL,
      payload: { limit: 10, page: 1, userId: user?.id },
    });
  }

  render() {
    const { postLists = [], page, limit, type, typePage } = this.props;
    const { isShowModal, userLikes, openedCommentId } = this.state;
    const currentUser = AuthService.getCurrentUser();
    const isPersonel = typePostListPage.PERSONEL_PAGE === typePage;
    return (
      <div>
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
                    type={type}
                  />
                ) : (
                  ""
                )}
                <h5>
                  <Link
                    to={{
                      pathname: routes.PERSONEL,
                    }}
                    state={{userId: post?.user?.id}}
                    onClick={isPersonel ? () => window.location.reload() : null}
                  >
                    {`${post?.user?.lastName || ""} ${
                      post?.user?.middleName || ""
                    } ${post?.user?.firstName || ""}`}
                  </Link>
                  <p>
                    {post?.createdAt
                      ? moment(post?.createdAt).format("YYYY-MM-DD hh:mm:ss")
                      : ""}
                  </p>
                </h5>
              </span>
              <p className="TitlePost">{post?.title || ""}</p>
              <div className="ContentPostHomePage">
                {post?.content?.split("\r\n")?.map((content, index) => {
                  return <div key={`content${index}`}>&emsp;{content}</div>;
                })}
              </div>
              <br />
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
                  onClick={() => this.actionLike(post?.id, isPersonel, currentUser?.id)}
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
                      onClick={(event) => this.sendComment(event, post?.id, isPersonel, currentUser?.id)}
                    >
                      send
                    </Button>
                  </InputGroup>
                  <ShowCommentHomePage
                    commentList={post?.comments || []}
                    isPersonel={isPersonel}
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
          isPersonel={isPersonel}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    postLists: state.PostReducer.postLists,
    total: state.PostReducer.total,
    typePage: state.PostReducer.typePage,
    userId: state.PostReducer.userId,
  };
}

export default connect(mapStateToProps)(PostListHomePage);
