import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import { postAction } from "../../../../store/action.store";
import DisplayCommentPost from "./display-comment";
import { sliceString } from "../../../../utils/util";
import ModalCommon from "../../modal";
import { typeModal } from "../../../../constants/constant";

class ShowCommentHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      content: "",
      commentId: "",
      isShowModalDelete: false,
    };
    this.dispatch = this.props.dispatch;
  }

  showModal(id, content) {
    this.setState({
      isShowModal: true,
      content,
      commentId: id,
    });
  }

  closeModal() {
    this.setState({
      isShowModal: false,
    });
  }

  showModalDelete(id, content) {
    this.setState({
      isShowModalDelete: true,
      content,
      commentId: id,
    });
  }

  closeModalDelete() {
    this.setState({
      isShowModalDelete: false,
    });
  }

  onChangeComment(event) {
    this.setState({
      content: event.target.value,
    });
  }

  updateComment() {
    const { content, commentId } = this.state;
    this.dispatch({
      type: postAction.UPDATE_COMMENT,
      id: commentId,
      payload: { content },
    });
    this.props.fetchPostList();
    this.setState({
      isShowModal: false,
    });
  }

  deleteComment() {
    const { commentId } = this.state;
    this.dispatch({ type: postAction.DELETE_COMMENT, id: commentId });
    this.props.fetchPostList();
    this.setState({
      isShowModalDelete: false,
    });
  }

  render() {
    const { commentList = [], isPersonel, userId, userPost } = this.props;
    const { isShowModal, content, isShowModalDelete } = this.state;
    const updateBodyModal = (
      <Form.Control
        aria-label="update comment"
        as="textarea"
        rows={4}
        name="content"
        defaultValue={content}
        onChange={(event) => this.onChangeComment(event)}
      />
    );
    const deleteBodyModal = (
      <p>
        Bạn có chắc chắn muốn xóa bình luận: "
        <b>{sliceString(content, 20)}...</b>"?
      </p>
    );

    return (
      <>
        <DisplayCommentPost
          commentList={commentList}
          userId={userId}
          userPost={userPost}
          isPersonel={isPersonel}
          showModalUpdate={(id, content) => this.showModal(id, content)}
          showModalDelete={(id, content) => this.showModalDelete(id, content)}
        />
        <ModalCommon
          isShowModal={isShowModal}
          onClose={() => this.closeModal()}
          titleHeader="Cập nhật bình luận"
          content={updateBodyModal}
          onAction={() => this.updateComment()}
        />

        <ModalCommon
          isShowModal={isShowModalDelete}
          onClose={() => this.closeModalDelete()}
          content={deleteBodyModal}
          onAction={() => this.deleteComment()}
          isShowHeader={false}
          isShowFooter={false}
          actionType={typeModal.DELETE}
          size="sm"
        />
      </>
    );
  }
}

export default connect()(ShowCommentHomePage);
