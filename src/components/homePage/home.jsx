import React, { Component } from "react";
import MenuMain from "../menuMain";
import Footer from "../footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment/moment";
import { connect } from "react-redux";
import { postAction } from "../../store/action";
import {
  BsFillHandThumbsUpFill,
  BsFillChatLeftTextFill,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsFillReplyFill,
} from "react-icons/bs";
import "./index.css";
import ModalHomepage from "./components/modal";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

class Home extends Component {
  constructor(props) {
    super(props);
    this.fetchAllPosts = this.fetchAllPosts.bind(this);
    this.state = {
      page: 1,
      limit: 10,
      isShowModal: false,
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
    console.log("dkdkd", commentPost, postId);
  }

  render() {
    const { postLists = [] } = this.props;
    const { isShowModal, userLikes, isShowComment } = this.state;
    return (
      <>
        <MenuMain />
        <Row>
          <Col xs lg="4">
            <div className="leftMenu">
              <h4>left menu home page</h4>
              <p>some design such as search, user list online...</p>
            </div>
          </Col>
          <Col>
            {postLists?.map((post) => {
              return (
                <div className="PostItem" key={post?.id}>
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
                          ? moment(post?.createdAt).format(
                              "YYYY-MM-DD hh:mm:ss"
                            )
                          : ""}
                      </p>
                    </h5>
                  </span>
                  <p className="TitlePost">{post?.title || ""}</p>
                  <p>{post.content}</p>
                  <p>
                    {post?.attachments?.map((image) => {
                      return (
                        <img
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
                      onClick={() => this.showModal(post?.likes || [])}
                    >
                      <BsFillHandThumbsUpFill /> {post?.likes?.length}
                    </Button>{" "}
                    <span className="NumberCommentShare">
                      <Button
                        className="NumberComment"
                        aria-controls="comment-home-page-post"
                        aria-expanded={isShowComment}
                        onClick={() => this.showComment()}
                      >
                        <BsFillChatLeftTextFill /> {post?.comments?.length}
                      </Button>{" "}
                      <Button className="NumberShare">
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
                      onClick={() => this.actionLike(post?.id)}
                    >
                      <BsFillHandThumbsUpFill /> like
                    </Button>
                    <Button
                      className="ButtonLSC"
                      aria-controls="comment-home-page-post"
                      aria-expanded={isShowComment}
                      onClick={() => this.showComment()}
                    >
                      <BsFillChatLeftTextFill /> comment
                    </Button>{" "}
                    <Button
                      className="ButtonLSC"
                      onClick={() => this.actionShare(post?.id)}
                    >
                      <BsFillReplyFill /> share
                    </Button>
                  </p>
                  <Collapse in={isShowComment}>
                    <div id="comment-home-page-post">
                      <InputGroup className="mb-3">
                        <Form.Control
                          placeholder="write something comments..."
                          aria-label="comment post"
                          aria-describedby="basic-addon2"
                          onChange={(event) => this.onchangeValueComment(event)}
                        />
                        <Button
                          id="basic-addon2"
                          onClick={(event) => this.sendComment(event, post?.id)}
                        >
                          send
                        </Button>
                      </InputGroup>
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
              <button className="ButtonBack">
                <BsChevronDoubleLeft />
              </button>
            }{" "}
            <button className="ButtonNext">
              <BsChevronDoubleRight />
            </button>
            <br />
            <br />
          </Col>
        </Row>
        <Footer />
      </>
    );
  }
}

function mapStateToProps(state) {
  return { postLists: state.PostReducer.postLists };
}

export default connect(mapStateToProps)(Home);
