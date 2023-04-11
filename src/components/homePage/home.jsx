/* eslint-disable jsx-a11y/anchor-is-valid */
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.fetchAllPosts = this.fetchAllPosts.bind(this);
    this.state = {
      page: 1,
      limit: 10,
      isShowModal: false,
      userLikes: [],
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
    dispatch({ type: postAction.LIKE_POST, payload: { postId }});
    setTimeout(() => {
      dispatch({ type: postAction.GET_ALL_POST, payload: { page, limit } });
    }, 100)
  }

  render() {
    const { postLists = [] } = this.props;
    const { isShowModal, userLikes } = this.state;
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
                    <a
                      className="NumberLike"
                      href="#"
                      onClick={() => this.showModal(post?.likes || [])}
                    >
                      <BsFillHandThumbsUpFill /> {post?.likes?.length}
                    </a>{" "}
                    <span className="NumberCommentShare">
                      <a className="NumberComment">
                        <BsFillChatLeftTextFill /> {post?.comments?.length}
                      </a>{" "}
                      <a className="NumberShare">
                        <BsFillReplyFill />{post?.shares?.length}
                      </a>
                    </span>
                  </p>
                  <br />
                  <hr />
                  <p className="LikeShareComment">
                    <button
                      className="ButtonLSC"
                      onClick={() => this.actionLike(post?.id)}
                    >
                      <BsFillHandThumbsUpFill /> like
                    </button>
                    <button className="ButtonLSC">
                    <BsFillChatLeftTextFill /> comment
                    </button>{" "}
                    <button className="ButtonLSC">
                    <BsFillReplyFill /> share
                    </button>
                  </p>
                  <br />
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
