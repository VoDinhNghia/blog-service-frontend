import { messageAction } from "../action";

const initState = {
  conversationInfo: {},
}

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
    default:
      return state;
  }
};

export default MessageReducer;