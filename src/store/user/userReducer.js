import { userAction } from "../action";

const initState = {
  userInfo: {},
}

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case userAction.GET_USER_BY_ID:
      return {
        ...state,
        isLoading: true,
      };
    case userAction.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        userInfo: action?.payload || {},
      };
    default:
      return state;
  }
};

export default UserReducer;