import React, { Component } from "react";
import { connect } from "react-redux";
import { postAction } from "../../../../store/action.store";
import "./index.css";
import PostListHomePage from "../../../commons/post-list";
import NewPostCommon from "../../../commons/create-post";
import PaginationPage from "../../../commons/pagination";
import { calCurrentPage, calToTalPage } from "../../../../utils/util";

class RightHomePage extends Component {
  constructor(props) {
    super(props);
    this.fetchAllPosts = this.fetchAllPosts.bind(this);
    this.state = {
      page: 1,
      limit: 50,
      isShowNewPost: false,
    };
    this.dispatch = this.props.dispatch;
  }

  componentDidMount() {
    this.fetchAllPosts();
  }

  async fetchAllPosts() {
    const { limit, page } = this.state;
    this.dispatch({ type: postAction.GET_ALL_POST, payload: { page, limit } });
  }

  goToPage(totalPage = 0, isNextPage = true) {
    const { page } = this.state;
    const currentPage = calCurrentPage(page, totalPage, isNextPage);
    this.setState({
      page: currentPage,
    });
    setTimeout(() => {
      this.dispatch({
        type: postAction.GET_ALL_POST,
        payload: { page: currentPage, limit: this.state.limit },
      });
    }, 100);
  }

  render() {
    const { postLists = [], total = 0 } = this.props;
    const totalPage = calToTalPage(total, this.state.limit);

    return (
      <>
        <NewPostCommon />
        <PostListHomePage
          postLists={postLists}
          page={this.state.page}
          limit={this.state.limit}
        />
        <PaginationPage
          page={this.state.page}
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
})(RightHomePage);
