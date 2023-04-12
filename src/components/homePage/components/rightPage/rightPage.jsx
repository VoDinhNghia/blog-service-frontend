import React, { Component } from "react";
import { connect } from "react-redux";
import { postAction } from "../../../../store/action";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import "./index.css";
import NewPostModal from "../newPost/newPost";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import AuthService from "../../../../services/authService";
import PostListHomePage from "./components/postList";

class RightHomePage extends Component {
  constructor(props) {
    super(props);
    this.fetchAllPosts = this.fetchAllPosts.bind(this);
    this.state = {
      page: 1,
      limit: 10,
      isShowNewPost: false,
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
    const { limit, page, isShowNewPost } = this.state;
    const totalPage = Math.round(Number(total / limit) + 0.5);
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
          closeNewPost={(value) => this.closeNewPost(value)}
        />
        <PostListHomePage postLists={postLists} />
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
