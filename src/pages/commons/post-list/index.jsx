import React, { Component } from "react";
import { connect } from "react-redux";
import { postAction } from "../../../store/action.store";
import "./index.css";
import ModalLikeHomepage from "./like-modal";
import AuthService from "../../../services/auth.service";
import ShowImagePost from "./show-image";
import { typePostListPage } from "../../../constants/constant";
import HeaderPost from "./header-post";
import CountActionPost from "./count-action-post";
import DisplayBtnActionPost from "./btn-action-post";
import CollapseCommentPost from "./collapse-comment-post";

class PostListHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      userLikes: [],
      openedCommentId: null,
      commentPost: "",
    };
    this.dispatch = this.props.dispatch;
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

  actionLike(postId, action) {
    this.dispatch({ type: postAction.LIKE_POST, payload: { postId, action } });
    this.fetchPostList();
  }

  actionShare(postId) {
    this.dispatch({
      type: postAction.SHARE_POST,
      payload: { postId, privateMode: false },
    });
    this.fetchPostList();
  }

  showComment(postId) {
    const { openedCommentId } = this.state;
    this.setState({
      openedCommentId: openedCommentId !== postId ? postId : null,
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
    this.dispatch({
      type: postAction.COMMENT_POST,
      payload: { postId, content: commentPost },
    });
    this.fetchPostList();
    this.setState({
      commentPost: "",
    });
  }

  fetchPostList() {
    const { userId, page, limit, typePage } = this.props;
    const isPersonel = typePostListPage.PERSONEL_PAGE === typePage;
    const payload = { page, limit };
    setTimeout(() => {
      this.dispatch({
        type: isPersonel
          ? postAction.GET_ALL_POST_PERSONEL
          : postAction.GET_ALL_POST,
        payload: isPersonel ? { ...payload, userId } : payload,
      });
    }, 100);
  }

  render() {
    const { postLists = [], typePage } = this.props;
    const { isShowModal, userLikes, openedCommentId, commentPost } = this.state;
    const currentUser = AuthService.getCurrentUser();
    const isPersonel = typePostListPage.PERSONEL_PAGE === typePage;

    return (
      <div>
        {postLists?.map((post, index) => {
          return (
            <div className="PostItem" key={`${post?.id}${index}`}>
              <HeaderPost
                post={post}
                currentUser={currentUser}
                isPersonel={isPersonel}
                fetchPostList={() => this.fetchPostList()}
              />
              <ShowImagePost
                imageLists={post?.attachments}
                isDeleted={currentUser?.id === post?.user?.id}
                fetchPostList={() => this.fetchPostList()}
              />
              <CountActionPost
                openedCommentId={openedCommentId}
                post={post}
                showModal={(data) => this.showModal(data)}
                showComment={(id) => this.showComment(id)}
              />
              <DisplayBtnActionPost
                post={post}
                currentUser={currentUser}
                openedCommentId={openedCommentId}
                actionLike={(id, action) => this.actionLike(id, action)}
                actionShare={(id) => this.actionShare(id)}
                showComment={(id) => this.showComment(id)}
              />
              <CollapseCommentPost
                openedCommentId={openedCommentId}
                post={post}
                commentPost={commentPost}
                currentUser={currentUser}
                onchangeValueComment={(e) => this.onchangeValueComment(e)}
                sendComment={(e, id) => this.sendComment(e, id)}
                fetchPostList={() => this.fetchPostList()}
              />
            </div>
          );
        })}
        <ModalLikeHomepage
          data={userLikes}
          isShowModal={isShowModal}
          closeModal={(value) => this.closeModal(value)}
          isPersonel={isPersonel}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    postLists: state.PostReducer.postLists,
    total: state.PostReducer.total,
    typePage: state.PostReducer.typePage,
    userId: state.PostReducer.userId,
  };
})(PostListHomePage);
