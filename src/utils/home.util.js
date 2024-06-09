import {
  BsFillHandThumbsUpFill,
  BsFillEmojiHeartEyesFill,
} from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";

export const filterStatusLoginUser = (userList = [], searchKey) => {
  return userList?.filter((user) =>
    searchKey ? user?.statusLogin || !user?.statusLogin : user?.statusLogin
  );
};

export const countEmotionPost = (actions = [], type = "") => {
  const count = actions.filter((p) => p?.action === type)?.length;
  return count;
};

export const findCurrentUserAction = (post = {}, currentUser, type) => {
  return post?.likes?.find(
    (p) => p?.user?.id === currentUser?.id && p?.action === type
  );
};

export const displayBtnLikePost = (isLike, isHeart, isLove) => {
  let color = isLike ? "blue" : "gray";
  let title = "Thích";
  let icon = <BsFillHandThumbsUpFill />;
  if (isHeart) {
    color = "#e810c0";
    title = "Thả tim";
    icon = <AiFillHeart />;
  }
  if (isLove) {
    color = "red";
    title = "Yêu thích";
    icon = <BsFillEmojiHeartEyesFill />;
  }
  const obj = {
    color,
    title,
    icon,
  };
  return obj;
};
