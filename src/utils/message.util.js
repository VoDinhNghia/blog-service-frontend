import AuthenService from "../services/authService";

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