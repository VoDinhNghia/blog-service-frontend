import { combineReducers } from "redux";
import { postAction } from "./action";

const initState = {
  postLists: [],
  isLoading: false,
  total: 0,
};

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
        isLoading: true,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
    PostReducer: PostReducer
});

export default rootReducer;