import React, { Component } from "react";
import moment from "moment/moment";
import "./index.css";
import { Link } from "react-router-dom";
import { routes, formatDateTime } from "../../../../common/constant";
import Button from "react-bootstrap/Button";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

class ShowCommentHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      content: "",
      commentId: "",
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

  onChangeComment(event) {
    this.setState({
      content: event.target.value,
    });
  }

  updateComment() {
    console.log("comment");
  }

  deleteComment(id) {
    console.log("comment", id);
  }

  render() {
    const { commentList = [], isPersonel, userId, userPost } = this.props;
    const { isShowModal, content } = this.state;

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
                              onClick={() => this.showModal(comment?.id, comment?.content)}
                            >
                              <BsFillPencilFill className="IconUpdateComment" />
                            </Button>
                          ) : null}
                          {userId === userPost ||
                          comment?.user?.id === userId ? (
                            <Button
                              className="BtnActionComment"
                              size="sm"
                              variant="light"
                              onClick={() => this.deleteComment(comment?.id)}
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
      </>
    );
  }
}

export default connect()(ShowCommentHomePage);
