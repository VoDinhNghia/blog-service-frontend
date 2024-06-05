import React, { Component } from "react";
import moment from "moment/moment";
import "./index.css";
import { Link } from "react-router-dom";
import { routes, formatDateTime } from "../../../../constants/constant";
import Button from "react-bootstrap/Button";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { postAction } from "../../../../store/action.store";

class ShowCommentHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      content: "",
      commentId: "",
      isShowModalDelete: false,
    };
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
    const { dispatch } = this.props;
    const { content, commentId } = this.state;
    dispatch({
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
    const { dispatch } = this.props;
    const { commentId } = this.state;
    dispatch({ type: postAction.DELETE_COMMENT, id: commentId });
    this.props.fetchPostList();
    this.setState({
      isShowModalDelete: false,
    });
  }

  render() {
    const { commentList = [], isPersonel, userId, userPost } = this.props;
    const { isShowModal, content, isShowModalDelete } = this.state;

    return (
      <>
        {commentList.map((comment, index) => {
          return (
            <div key={`${comment?.id}${index}`}>
              <ul className="commentsListHomepage">
                <li>
                  <div className="commentMainLevelHomepage">
                    <div className="commentAvatar">
                      <img
                        src={comment?.user?.avatar || "/image/icon-login.png"}
                        alt=""
                      />
                    </div>
                    <div className="commentBoxHompage">
                      <div className="commentHead">
                        <h6 className="commentName">
                          <Link
                            to={{
                              pathname: routes.PERSONEL,
                            }}
                            state={{ userId: comment?.user?.id }}
                            onClick={
                              isPersonel ? () => window.location.reload() : null
                            }
                          >{`${comment?.user?.lastName || ""} ${
                            comment?.user?.middleName || ""
                          } ${comment?.user?.firstName || ""}`}</Link>
                          <br />
                          <span>
                            {comment?.createdAt
                              ? moment(comment?.createdAt).format(
                                  formatDateTime
                                )
                              : ""}
                          </span>
                        </h6>
                        <div className="ActionComment">
                          {(comment?.user?.id === userId &&
                            userId === userPost) ||
                          (comment?.user?.id === userId &&
                            userId !== userPost) ? (
                            <Button
                              className="BtnActionComment"
                              size="sm"
                              variant="light"
                              onClick={() =>
                                this.showModal(comment?.id, comment?.content)
                              }
                            >
                              <BsPencilSquare className="IconUpdateComment" />
                            </Button>
                          ) : null}
                          {userId === userPost ||
                          comment?.user?.id === userId ? (
                            <Button
                              className="BtnActionComment"
                              size="sm"
                              variant="light"
                              onClick={() =>
                                this.showModalDelete(
                                  comment?.id,
                                  comment?.content
                                )
                              }
                            >
                              <BsFillTrashFill className="IconDeleteComment" />
                            </Button>
                          ) : null}
                        </div>
                      </div>
                      <div className="commentContent">{comment?.content}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          );
        })}
        <Modal show={isShowModal} onHide={() => this.closeModal()}>
          <Modal.Header closeButton={true} className="HeaderModalUpdatePost">
            <Modal.Title className="TitlePostUpdate">
              Update comment
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              aria-label="update comment"
              as="textarea"
              rows={4}
              name="content"
              defaultValue={content}
              onChange={(event) => this.onChangeComment(event)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.updateComment()}>Save</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={isShowModalDelete}
          onHide={() => this.closeModalDelete(false)}
          size="sm"
        >
          <Modal.Body>
            <p>
              Are you sure you want to delete this comment "<b>{content?.slice(0, 10)}...</b>"?
            </p>
            <Button
              variant="danger"
              className="BtnCancleModalUpdatePost"
              onClick={() => this.closeModalDelete()}
            >
              Cancle
            </Button>
            <Button onClick={() => this.deleteComment()}>Ok</Button>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default connect()(ShowCommentHomePage);
