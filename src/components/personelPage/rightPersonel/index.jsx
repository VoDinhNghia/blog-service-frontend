import React, { Component } from "react";
import { connect } from "react-redux";
import { postAction } from "../../../store/action";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import "./index.css";
import PostListHomePage from "../../commons/postListCommon";
import NewPostCommon from "../../commons/newPostCommon";
import AuthService from "../../../services/authService";
import { typePostListPage } from "../../../common/constant";

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
    const { dispatch } = this.props;
    const currentUser = AuthService.getCurrentUser();
    dispatch({
      type: postAction.GET_ALL_POST,
      payload: { page, limit, userId: currentUser?.id },
    });
  }

  goToNextPage() {
    const { total = 0, dispatch } = this.props;
    const { limit, page } = this.state;
    const numberPages = Math.round(Number(total / limit) + 0.5);
    const currentUser = AuthService.getCurrentUser();
    if (page < numberPages) {
      this.setState({
        page: page + 1,
      });
      setTimeout(() => {
        dispatch({
          type: postAction.GET_ALL_POST,
          payload: { page: this.state.page, limit, userId: currentUser?.id },
        });
      }, 100);
    }
  }

  goToBackPage() {
    const { dispatch } = this.props;
    const { limit, page } = this.state;
    const currentUser = AuthService.getCurrentUser();
    if (page > 1) {
      this.setState({
        page: page - 1,
      });
      setTimeout(() => {
        dispatch({
          type: postAction.GET_ALL_POST,
          payload: { page: this.state.page, limit, userId: currentUser?.id },
        });
      }, 100);
    }
  }

  render() {
    const { postLists = [], total = 0 } = this.props;
    const { limit, page } = this.state;
    const totalPage = Math.round(Number(total / limit) + 0.5);
    const type = typePostListPage.PERSONEL_PAGE;
    return (
      <>
        <NewPostCommon type={type} />
        <PostListHomePage
          postLists={postLists}
          page={page}
          limit={limit}
          type={type}
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
