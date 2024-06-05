import { postAction } from "../action.store";

const initState = {
  postLists: [],
  isLoading: false,
  total: 0,
  userId: null,
  typePage: "",
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
        typePage: "",
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

export default PostReducer;
