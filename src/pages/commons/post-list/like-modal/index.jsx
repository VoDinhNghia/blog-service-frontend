import React, { Component } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { likeAction, routes } from "../../../../constants/constant";
import {
  BsFillEmojiHeartEyesFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import ModalCommon from "../../modal";
import { getUserName } from "../../../../utils/util";

class ModalLikeHomepage extends Component {
  render() {
    const { isShowModal = false, data = [], isPersonel } = this.props;
    const contentBodyModal = (
      <>
        {data?.map((lists, index) => {
          return (
            <p className="ModalUserLike" key={`${lists?.id}${index}`}>
              <span>
                <img
                  src={lists?.user?.avatar || "/image/icon-login.png"}
                  alt=""
                />
                <Link
                  to={{
                    pathname: routes.PERSONEL,
                  }}
                  state={{ userId: lists?.user?.id }}
                  onClick={isPersonel ? () => window.location.reload() : null}
                >
                  {getUserName(lists?.user)}
                </Link>{" "}
                (
                {lists?.action === likeAction.LIKE ? (
                  <BsFillHandThumbsUpFill className="LikeIcon" />
                ) : null}
                {lists?.action === likeAction.HEART ? (
                  <AiFillHeart className="HeartEyesIcon" />
                ) : null}
                {lists?.action === likeAction.LOVE ? (
                  <BsFillEmojiHeartEyesFill className="HeartIcon" />
                ) : null}
                )
              </span>
            </p>
          );
        })}
      </>
    );
    return (
      <div>
        <ModalCommon
          isShowModal={isShowModal}
          onClose={() => this.props.closeModal()}
          titleHeader="Danh sách người dùng thích bài viết"
          isShowFooter={false}
          content={contentBodyModal}
        />
      </div>
    );
  }
}

export default ModalLikeHomepage;
