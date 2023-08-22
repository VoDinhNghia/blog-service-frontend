import { messageAction } from "../action";

const initState = {
  conversationInfo: {},
  messageConverList: [],
  newMessages: [],
};

const MessageReducer = (state = initState, action) => {
  switch (action.type) {
    case messageAction.GET_ONE_CONVERSATION:
      return {
        ...state,
        isLoading: true,
      };
    case messageAction.GET_ONE_CONVERSATION_SUCCESS:
      return {
        ...state,
        conversationInfo: action?.payload || {},
        isLoading: false,
      };
    case messageAction.CLOSE_MODAL_MESS:
      return {
        ...state,
        conversationInfo: {},
        isLoading: false,
      };
    case messageAction.GET_MESSAGE_BY_CONVERSATION_SUCCESS:
      return {
        ...state,
        messageConverList: action?.payload || [],
        isLoading: false,
      };
    case messageAction.GET_CONVERSATION_BY_USER_SUCCESS:
      return {
        ...state,
        newMessages: action?.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default MessageReducer;
