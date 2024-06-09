import { Component } from "react";
import { Button } from "react-bootstrap";
import {
  BsFillChatLeftTextFill,
  BsFillHandThumbsUpFill,
  BsFillEmojiHeartEyesFill,
  BsFillReplyFill,
} from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { countEmotionPost } from "../../../../utils/home.util";
import { likeAction } from "../../../../constants/constant";

class CountActionPost extends Component {
  render() {
    const { post = {}, openedCommentId = "", showModal, showComment } = this.props;
    const likeNumber = countEmotionPost(post?.likes, likeAction.LIKE);
    const loveNumber = countEmotionPost(post?.likes, likeAction.LOVE);
    const heartNumber = countEmotionPost(post?.likes, likeAction.HEART);
    return (
      <>
        <p className="NumberLikeShareComment">
          <Button
            className="NumberLike"
            variant="outline-light"
            onClick={() => showModal(post?.likes || [])}
          >
            {likeNumber > 0 ? (
              <span>
                <BsFillHandThumbsUpFill className="LikeIcon" /> {likeNumber}{" "}
              </span>
            ) : null}
            {loveNumber > 0 ? (
              <span>
                <BsFillEmojiHeartEyesFill className="HeartIcon" /> {loveNumber}{" "}
              </span>
            ) : null}
            {heartNumber > 0 ? (
              <span>
                <AiFillHeart className="HeartEyesIcon" /> {heartNumber}{" "}
              </span>
            ) : null}
          </Button>{" "}
          <span className="NumberCommentShare">
            <Button
              className="NumberComment"
              variant="outline-light"
              aria-expanded={openedCommentId === post?.id}
              onClick={() => showComment(post?.id)}
            >
              <BsFillChatLeftTextFill /> {post?.comments?.length}
            </Button>{" "}
            <Button className="NumberShare" variant="outline-light">
              <BsFillReplyFill />
              {post?.shares?.length}
            </Button>
          </span>
        </p>
        <br />
        <hr />
      </>
    );
  }
}

export default CountActionPost;
