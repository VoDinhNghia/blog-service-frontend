import React, { Component } from "react";
import moment from "moment/moment";
import "./index.css";
import { Link } from "react-router-dom";
import { routes } from "../../../../common/constant";

class ShowCommentHomePage extends Component {
  render() {
    const { commentList = [], isPersonel } = this.props;
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
                            onClick={isPersonel ? () => window.location.reload() : null}
                          >{`${comment?.user?.lastName || ""} ${
                            comment?.user?.middleName || ""
                          } ${comment?.user?.firstName || ""}`}</Link>
                        </h6>
                        <span>
                          {comment?.createdAt
                            ? moment(comment?.createdAt).format(
                                "YYYY-MM-DD hh:mm:ss"
                              )
                            : ""}
                        </span>
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

export default ShowCommentHomePage;
