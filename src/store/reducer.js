import { combineReducers } from "redux";

const initState = {
  postListTest: [],
  isLoading: false,
  total: 0,
};

const PostReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL_POST":
      console.log('sssss', action);
      return {
        ...state,
        postListTest: action?.payload?.results || [],
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