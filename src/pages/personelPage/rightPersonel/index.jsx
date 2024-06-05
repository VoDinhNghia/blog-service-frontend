import React, { Component } from "react";
import { connect } from "react-redux";
import { postAction } from "../../../store/action.store";
import "./index.css";
import PostListHomePage from "../../commons/post-list";
import NewPostCommon from "../../commons/create-post";
import PaginationPage from "../../commons/pagination";

class RightPersonelPage extends Component {
  constructor(props) {
    super(props);
    this.fetchAllPosts = this.fetchAllPosts.bind(this);
    this.state = {
      page: 1,
      limit: 50,
      isShowNewPost: false,
    };
  }

  componentDidMount() {
    this.fetchAllPosts();
  }

  async fetchAllPosts() {
    const { limit, page } = this.state;
    const { dispatch, userId } = this.props;
    dispatch({
      type: postAction.GET_ALL_POST_PERSONEL,
      payload: { page, limit, userId },
    });
  }

  goToNextPage(totalPage) {
    const { dispatch, userId } = this.props;
    const { limit, page } = this.state;
    const currentPage = page < totalPage ? page + 1 : totalPage;
    this.setState({
      page: currentPage,
    });
    setTimeout(() => {
      dispatch({
        type: postAction.GET_ALL_POST_PERSONEL,
        payload: { page: currentPage, limit, userId },
      });
    }, 100);
  }

  goToBackPage() {
    const { dispatch, userId } = this.props;
    const { limit, page } = this.state;
    const currentPage = page > 1 ? page - 1 : 1;
    this.setState({
      page: currentPage,
    });
    setTimeout(() => {
      dispatch({
        type: postAction.GET_ALL_POST_PERSONEL,
        payload: { page: currentPage, limit, userId },
      });
    }, 100);
  }

  render() {
    const { postLists = [], total = 0 } = this.props;
    const { limit, page } = this.state;
    const totalPage = Math.round(Number(total / limit) + 0.45);
    return (
      <>
        <NewPostCommon page={page} limit={limit} />
        <PostListHomePage postLists={postLists} page={page} limit={limit} />
        <PaginationPage
          page={page}
          totalPage={totalPage}
          goToBackPage={() => this.goToBackPage()}
          goToNextPage={() => this.goToNextPage(totalPage)}
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

export default connect(mapStateToProps)(RightPersonelPage);
