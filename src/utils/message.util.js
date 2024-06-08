import AuthenService from "../services/auth.service";
import { Link } from "react-router-dom";
import { routes } from "../constants/constant";
import { showDateTimeMessage, getUserName } from "./util";

export const getNumberMsgNotRead = (messages = []) => {
  const listMessages = getMessageNotRead(messages);
  return listMessages?.length;
};

export const getMessageNotRead = (messages = []) => {
  const currentUser = AuthenService.getCurrentUser();
  const listMessages = messages?.filter((conver) =>
    conver?.messages?.find(
      (msg) => msg?.userSendId !== currentUser?.id && !msg?.status
    )
  );
  return listMessages;
};

export const getOneConversation = (dispatch, type, userId) => {
  setTimeout(() => {
    dispatch({
      type,
      chatWithId: userId,
    });
  }, 70);
}

export const displayContentMess = (content, createdAt) => {
  const currentUser = AuthenService.getCurrentUser();
  return (
    <>
      <div className="d-flex justify-content-between">
        <p className="small mb-1">
          <Link
            to={{ pathname: routes.PERSONEL }}
            state={{ userId: currentUser?.id }}
          >
            You
          </Link>{" "}
          - {" "}
          <span className="small mb-1 text-muted">
            {showDateTimeMessage(createdAt)}
          </span>
        </p>
      </div>
      <div className="d-flex flex-row justify-content-start mb-4 pt-1">
        <img
          src="/image/icon-login.png"
          alt="avatar 1"
          className="IconAvatarMessage"
        />
        <div>
          <p className="MessageContentOfMe">{content}</p>
        </div>
      </div>
    </>
  );
};

export const displayContentMessFriend = (content, createdAt, userInfo) => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <span className="small mb-1 text-muted"></span>
        <p className="small mb-1"></p>
        <span className="small mb-1 text-muted">
          {showDateTimeMessage(createdAt)} -{" "}
          <Link
            to={{ pathname: routes.PERSONEL }}
            state={{ userId: userInfo?.id }}
          >
            {getUserName(userInfo)}
          </Link>
        </span>
      </div>
      <div className="d-flex flex-row justify-content-end mb-4 pt-1">
        <div>
          <p className="MessageContent">{content}</p>
        </div>
        <img
          src="/image/icon-login.png"
          alt="avatar 1"
          className="IconAvatarMessage"
        />
      </div>
    </>
  );
};