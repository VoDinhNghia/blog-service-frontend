import { Component } from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import {
  BsFillReplyFill,
  BsFillHandThumbsUpFill,
  BsFillEmojiHeartEyesFill,
  BsFillChatLeftTextFill,
} from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { likeAction } from "../../../../constants/constant";
import { displayBtnLikePost, findCurrentUserAction } from "../../../../utils/home.util";

class DisplayBtnActionPost extends Component {
  render() {
    const {
      post = {},
      currentUser = {},
      openedCommentId = "",
      actionLike,
      showComment,
      actionShare,
    } = this.props;
    const isLike = findCurrentUserAction(post, currentUser, likeAction.LIKE);
    const isHeart = findCurrentUserAction(post, currentUser, likeAction.HEART);
    const isLove = findCurrentUserAction(post, currentUser, likeAction.LOVE);
    const objBtnLike = displayBtnLikePost(isLike, isHeart, isLove);

    return (
      <p className="LikeShareComment text-center">
        <OverlayTrigger
          trigger="click"
          placement="top"
          overlay={
            <Popover>
              <Button
                variant="outline-light"
                onClick={() => actionLike(post?.id, likeAction.LIKE)}
                style={{ color: `${isLike ? "blue" : "gray"}`, fontSize: 25 }}
              >
                <BsFillHandThumbsUpFill />
              </Button>
              <Button
                variant="outline-light"
                onClick={() => actionLike(post?.id, likeAction.HEART)}
                style={{ color: `${isHeart ? "#e810c0" : "gray"}`, fontSize: 25 }}
              >
                <AiFillHeart />
              </Button>
              <Button
                variant="outline-light"
                onClick={() => actionLike(post?.id, likeAction.LOVE)}
                style={{
                  color: `${isLove ? "red" : "gray"}`,
                  fontSize: 25,
                }}
              >
                <BsFillEmojiHeartEyesFill />
              </Button>
            </Popover>
          }
        >
          <Button
            className="ButtonLSC"
            variant="outline-light"
            style={{ color: objBtnLike.color }}
          >
            {objBtnLike.icon} {objBtnLike.title}
          </Button>
        </OverlayTrigger>
        <Button
          className="ButtonLSC"
          variant="outline-light"
          aria-expanded={openedCommentId === post?.id}
          onClick={() => showComment(post?.id)}
        >
          <BsFillChatLeftTextFill /> Bình luận
        </Button>{" "}
        <Button
          className="ButtonLSC"
          variant="outline-light"
          onClick={() => actionShare(post?.id)}
          disabled={currentUser?.id === post?.user?.id ? true : false}
          style={currentUser?.id === post?.user?.id ? { color: "gray" } : {}}
        >
          <BsFillReplyFill /> Chia sẻ
        </Button>
      </p>
    );
  }
}

export default DisplayBtnActionPost;
