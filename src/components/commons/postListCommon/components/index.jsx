import React, { Component } from "react";
import moment from "moment/moment";
import "./index.css";

class ShowCommentHomePage extends Component {
  render() {
    const { commentList = [] } = this.props;
    return (
      <>
        {commentList.map((comment, index) => {
          return (
            <>
              <ul className="commentsListHomepage">
                <li key={`${comment?.id}${index}`}>
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
                          <a href={"not-yet"}>{`${
                            comment?.user?.lastName || ""
                          } ${comment?.user?.middleName || ""} ${
                            comment?.user?.firstName || ""
                          }`}</a>
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
            </>
          );
        })}
      </>
    );
  }
}

export default ShowCommentHomePage;
