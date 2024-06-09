import { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import { routes } from "../../../../../constants/constant";
import { getUserName, showDateTime } from "../../../../../utils/util";

class DisplayCommentPost extends Component {
  render() {
    const {
      commentList = [],
      userId = "",
      userPost = "",
      isPersonel = false,
      showModalUpdate,
      showModalDelete
    } = this.props;
    return (
      <>
        {commentList.map((comment, index) => {
          const isUserPost = userId === userPost;
          const isUserId = comment?.user?.id === userId;
          const isPermissonUpdate =
            (isUserId && isUserPost) || (isUserId && !isUserPost);
          const isPermissionDel = isUserPost || isUserId;
          const btnCommentAction = (isTypeUpdate = true) => {
            return isPermissonUpdate || isPermissionDel ? (
              <Button
                className="BtnActionComment"
                size="sm"
                variant="light"
                onClick={() =>
                  isTypeUpdate
                    ? showModalUpdate(comment?.id, comment?.content)
                    : showModalDelete(comment?.id, comment?.content)
                }
              >
                {isTypeUpdate ? (
                  <BsPencilSquare className="IconUpdateComment" />
                ) : (
                  <BsFillTrashFill className="IconDeleteComment" />
                )}
              </Button>
            ) : null;
          };
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
                          >
                            {getUserName(comment?.user)}
                          </Link>
                          <br />
                          <span>{showDateTime(comment?.createdAt)}</span>
                        </h6>
                        <div className="ActionComment">
                          {btnCommentAction(true)}
                          {btnCommentAction(false)}
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
      </>
    );
  }
}

export default DisplayCommentPost;
