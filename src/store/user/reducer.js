import { userAction } from "../action.store";

const initState = {
  userInfo: {},
  userList: [],
  total: 0,
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
        isLoading: false,
      };
    case userAction.GET_ALL_USER:
      return {
        ...state,
        isLoading: true,
      };
    case userAction.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        userList: action?.payload?.results,
        total: action?.payload?.total,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default UserReducer;