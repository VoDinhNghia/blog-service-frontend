import { combineReducers } from "redux";
import { postAction, userAction } from "./action";

const initState = {
  postLists: [],
  isLoading: false,
  total: 0,
  userId: null,
  typePage: '',
};

const userState = {
  userInfo: {},
}

const PostReducer = (state = initState, action) => {
  switch (action.type) {
    case postAction.GET_ALL_POST:
      return {
        ...state,
        isLoading: true,
      };
    case postAction.GET_ALL_POST_SUCCESS:
      return {
        ...state,
        postLists: action?.payload?.results || [],
        total: action?.payload?.total || 0,
        typePage: '',
        userId: null,
        isLoading: true,
      };
    case postAction.GET_ALL_POST_PERSONEL_SUCCESS:
      return {
        ...state,
        postLists: action?.payload?.results || [],
        total: action?.payload?.total || 0,
        typePage: action?.payload?.typePage,
        userId: action?.payload?.userId,
        isLoading: true,
      };
    default:
      return state;
  }
};

const UserReducer = (state = userState, action) => {
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

const rootReducer = combineReducers({
    PostReducer: PostReducer,
    UserReducer: UserReducer,
});

export default rootReducer;