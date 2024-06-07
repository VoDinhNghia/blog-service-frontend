import React, { Component } from "react";
import { connect } from "react-redux";
import { postAction } from "../../../store/action.store";
import "./index.css";
import PostListHomePage from "../../commons/post-list";
import NewPostCommon from "../../commons/create-post";
import PaginationPage from "../../commons/pagination";
import { calCurrentPage, calToTalPage } from "../../../utils/util";

class RightPersonelPage extends Component {
  constructor(props) {
    super(props);
    this.fetchAllPosts = this.fetchAllPosts.bind(this);
    this.state = {
      page: 1,
      limit: 50,
      isShowNewPost: false,
    };
    this.dispatch = this.props.dispatch;
    this.userId = this.props.userId;
  }

  componentDidMount() {
    this.fetchAllPosts();
  }

  fetchAllPosts() {
    this.fetchCommon(this.state.page);
  }

  goToPage(totalPage = 0, isNextPage = true) {
    const { page } = this.state;
    const currentPage = calCurrentPage(page, totalPage, isNextPage);
    this.setState({
      page: currentPage,
    });
    setTimeout(() => {
      this.fetchCommon(currentPage);
    }, 100);
  }

  fetchCommon(page) {
    this.dispatch({
      type: postAction.GET_ALL_POST_PERSONEL,
      payload: { page, limit: this.state.limit, userId: this.userId },
    });
  }

  render() {
    const { postLists = [], total = 0 } = this.props;
    const { limit, page } = this.state;
    const totalPage = calToTalPage(total, limit);
    return (
      <>
        <NewPostCommon page={page} limit={limit} />
        <PostListHomePage postLists={postLists} page={page} limit={limit} />
        <PaginationPage
          page={page}
          totalPage={totalPage}
          goToBackPage={() => this.goToPage(0, false)}
          goToNextPage={() => this.goToPage(totalPage, true)}
        />
      </>
    );
  }
}

export default connect((state) => {
  return {
    postLists: state.PostReducer.postLists,
    total: state.PostReducer.total,
  };
})(RightPersonelPage);
