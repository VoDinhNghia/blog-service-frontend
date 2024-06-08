import React, { Component } from "react";
import { connect } from "react-redux";
import { postAction } from "../../../../store/action.store";
import "./index.css";
import PostListHomePage from "../../../commons/post-list";
import NewPostCommon from "../../../commons/create-post";
import PaginationPage from "../../../commons/pagination";

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

  goToNextPage(totalPage) {
    const currentPage =
      this.state.page < totalPage ? this.state.page + 1 : totalPage;
    this.setState({
      page: currentPage,
    });
    setTimeout(() => {
      this.dispatch({
        type: postAction.GET_ALL_POST,
        payload: {
          page: currentPage,
          limit: this.state.limit,
        },
      });
    }, 100);
  }

  goToBackPage() {
    const currentPage = this.state.page > 1 ? this.state.page - 1 : 1;
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
    const totalPage = Math.round(Number(total / this.state.limit) + 0.45);

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
          goToBackPage={() => this.goToBackPage()}
          goToNextPage={() => this.goToNextPage(totalPage)}
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
