import AuthenService from "../services/authService";

export const getNumberMsgNotRead = (messages = []) => {
  const currentUser = AuthenService.getCurrentUser();
  const listMessages = messages?.filter((conver) =>
    conver?.messages?.find(
      (msg) => msg?.userSendId !== currentUser?.id && !msg?.status
    )
  );
  return listMessages?.length;
};
