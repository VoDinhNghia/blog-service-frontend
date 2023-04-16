import React, { Component } from "react";
import { connect } from "react-redux";
import { postAction } from "../../../store/action";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import "./index.css";
import PostListHomePage from "../../commons/postListCommon";
import NewPostCommon from "../../commons/newPostCommon";

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

  goToNextPage() {
    const { total = 0, dispatch, userId } = this.props;
    const { limit, page } = this.state;
    const numberPages = Math.round(Number(total / limit) + 0.5);
    if (page < numberPages) {
      this.setState({
        page: page + 1,
      });
      setTimeout(() => {
        dispatch({
          type: postAction.GET_ALL_POST_PERSONEL,
          payload: { page: this.state.page, limit, userId },
        });
      }, 100);
    }
  }

  goToBackPage() {
    const { dispatch, userId } = this.props;
    const { limit, page } = this.state;
    if (page > 1) {
      this.setState({
        page: page - 1,
      });
      setTimeout(() => {
        dispatch({
          type: postAction.GET_ALL_POST_PERSONEL,
          payload: { page: this.state.page, limit, userId },
        });
      }, 100);
    }
  }

  render() {
    const { postLists = [], total = 0 } = this.props;
    const { limit, page } = this.state;
    const totalPage = Math.round(Number(total / limit) + 0.5);
    return (
      <>
        <NewPostCommon page={page} limit={limit} />
        <PostListHomePage
          postLists={postLists}
          page={page}
          limit={limit}
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

export default connect(mapStateToProps)(RightPersonelPage);
