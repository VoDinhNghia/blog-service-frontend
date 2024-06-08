import { Component } from "react";
import { routes } from "../../../../constants/constant";
import { Link } from "react-router-dom";
import ActionPostItem from "../actions";
import { getUserName, showDateTime } from "../../../../utils/util";

class HeaderPost extends Component {
  render() {
    const {
      post = {},
      currentUser = {},
      isPersonel = false,
      fetchPostList,
    } = this.props;
    const { user = {}, title = "", content = "", createdAt = "" } = post;
    return (
      <>
        <span>
          <img
            src={user?.avatar || "/image/icon-login.png"}
            alt={user?.firstName}
            className="PostAvatar"
          />
          {currentUser.id === user?.id ? (
            <ActionPostItem
              postInfo={post}
              currentUser={currentUser}
              fetchPostList={() => fetchPostList()}
            />
          ) : (
            ""
          )}
          <h5>
            <Link
              to={{
                pathname: routes.PERSONEL,
              }}
              state={{ userId: user?.id }}
              onClick={isPersonel ? () => window.location.reload() : null}
            >
              {getUserName(user)}
            </Link>{" "}
            <span className="PrivateModePost">
              {post?.privateMode ? "(private)" : ""}
            </span>
            <p>Đã đăng vào lúc {showDateTime(createdAt)}</p>
          </h5>
        </span>
        <p className="TitlePost">{title || ""}</p>
        <div className="ContentPostHomePage">
          {content?.split("\r\n")?.map((content, index) => {
            return <div key={`content${index}`}>&emsp;{content}</div>;
          })}
        </div>
        <br />
      </>
    );
  }
}

export default HeaderPost;
