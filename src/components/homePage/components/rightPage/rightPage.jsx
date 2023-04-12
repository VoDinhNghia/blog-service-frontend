/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import moment from "moment/moment";
import { connect } from "react-redux";
import { postAction } from "../../../../store/action";
import {
  BsFillHandThumbsUpFill,
  BsFillChatLeftTextFill,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsFillReplyFill,
} from "react-icons/bs";
import "./index.css";
import ModalHomepage from "../modal/modal";
import NewPostModal from "../newPost/newPost";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import AuthService from "../../../../services/authService";

class RightHomePage extends Component {
  constructor(props) {
    super(props);
    this.fetchAllPosts = this.fetchAllPosts.bind(this);
    this.state = {
      page: 1,
      limit: 10,
      isShowModal: false,
      isShowNewPost: false,
      userLikes: [],
      isShowComment: false,
      commentPost: "",
    };
  }

  componentDidMount() {
    this.fetchAllPosts();
  }

  async fetchAllPosts() {
    const { limit, page } = this.state;
    const { dispatch } = this.props;
    dispatch({ type: postAction.GET_ALL_POST, payload: { page, limit } });
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

  actionLike(postId) {
    const { dispatch } = this.props;
    const { page, limit } = this.state;
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

  showComment() {
    const { isShowComment } = this.state;
    this.setState({
      isShowComment: !isShowComment,
    });
  }

  onchangeValueComment(event) {
    this.setState({
      commentPost: event.target.value,
    });
  }

  sendComment(event, postId) {
    const { commentPost } = this.state;
    event.preventDefault();
    const { dispatch } = this.props;
    const { page, limit } = this.state;
    dispatch({
      type: postAction.COMMENT_POST,
      payload: { postId, content: commentPost },
    });
    setTimeout(() => {
      dispatch({ type: postAction.GET_ALL_POST, payload: { page, limit } });
    }, 100);
  }

  goToNextPage() {
    const { total = 0, dispatch } = this.props;
    const { limit, page } = this.state;
    const numberPages = Math.round(Number(total / limit) + 0.5);
    if (page < numberPages) {
      this.setState({
        page: page + 1,
      });
      setTimeout(() => {
        dispatch({
          type: postAction.GET_ALL_POST,
          payload: { page: this.state.page, limit },
        });
      }, 100);
    }
  }

  goToBackPage() {
    const { dispatch } = this.props;
    const { limit, page } = this.state;
    if (page > 1) {
      this.setState({
        page: page - 1,
      });
      setTimeout(() => {
        dispatch({
          type: postAction.GET_ALL_POST,
          payload: { page: this.state.page, limit },
        });
      }, 100);
    }
  }

  render() {
    const { postLists = [], total = 0 } = this.props;
    const {
      isShowModal,
      userLikes,
      isShowComment,
      limit,
      page,
      isShowNewPost,
    } = this.state;
    const totalPage = Math.round(Number(total / limit) + 0.5);
    const currentUser = AuthService.getCurrentUser();
    return (
      <>
        <InputGroup className="PostHomePage">
          <Form.Control
            placeholder="write something new post..."
            aria-label="new post"
            aria-describedby="basic-addon-post-home"
            onClick={() => this.showNewPost()}
          />
          <Button onClick={() => this.showNewPost()} id="basic-addon-post-home" variant="light">
            post
          </Button>
        </InputGroup>
        <NewPostModal
          isShowNewPost={isShowNewPost}
          closeNewPost={(value) => this.closeNewPost(value)}
        />
        {postLists?.map((post, index) => {
          return (
            <div className="PostItem" key={`${post?.id}${index}`}>
              <span>
                <img
                  src={post?.user?.avatar || "/image/icon-login.png"}
                  alt={post?.user?.firstName}
                  className="PostAvatar"
                />
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
              <p>{post.content}</p>
              <p>
                {post?.attachments?.map((image, index) => {
                  return (
                    <img
                      key={`${image?.id}${index}`}
                      src={image?.url || ""}
                      alt={image?.originalname || ""}
                      height="200px"
                      width="250px"
                    />
                  );
                })}
              </p>
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
                    aria-controls={`comment-home-page-post#${post?.id}`}
                    aria-expanded={isShowComment}
                    onClick={() => this.showComment()}
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
                >
                  <BsFillHandThumbsUpFill /> like
                </Button>
                <Button
                  className="ButtonLSC"
                  variant="outline-light"
                  aria-controls={`comment-home-page-post#${post?.id}`}
                  aria-expanded={isShowComment}
                  onClick={() => this.showComment()}
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
              <Collapse in={isShowComment}>
                <div id={`comment-home-page-post#${post?.id}`}>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="write something comments..."
                      aria-label="comment post"
                      aria-describedby="basic-addon-comment-post"
                      onChange={(event) => this.onchangeValueComment(event)}
                    />
                    <Button
                      id="basic-addon-comment-post"
                      onClick={(event) => this.sendComment(event, post?.id)}
                    >
                      send
                    </Button>
                  </InputGroup>
                  {post?.comments?.map((comment, index) => {
                    return (
                      <>
                        <ul className="commentsListHomepage">
                          <li key={`${comment?.id}${index}`}>
                            <div className="commentMainLevelHomepage">
                              <div className="commentAvatar">
                                <img
                                  src={
                                    comment?.user?.avatar ||
                                    "/image/icon-login.png"
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="commentBoxHompage">
                                <div className="commentHead">
                                  <h6 className="commentName">
                                    <a href="">{`${
                                      comment?.user?.lastName || ""
                                    } ${comment?.user?.middleName || ""} ${
                                      comment?.user?.firstName || ""
                                    }`}</a>
                                  </h6>
                                  <span>
                                    {comment?.createdAt
                                      ? moment(comment?.createdAt).format(
                                          "YYYY-MM-DD hh:mm:ss"
                                        )
                                      : ""}
                                  </span>
                                </div>
                                <div className="commentContent">
                                  {comment?.content}
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </>
                    );
                  })}
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
        {
          <button className="ButtonBack" onClick={() => this.goToBackPage()}>
            <BsChevronDoubleLeft /> back
          </button>
        }{" "}
        <button className="BtnNumberPage">current: {page}</button>
        <button className="BtnTotalPage">
          total: {totalPage > 0 ? totalPage : 1}
        </button>
        <button className="ButtonNext" onClick={() => this.goToNextPage()}>
          next <BsChevronDoubleRight />
        </button>
        <br />
        <br />
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

export default connect(mapStateToProps)(RightHomePage);
