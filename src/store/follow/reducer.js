import { followAction } from "../action.store";

const initState = {
  followList: [],
  totalFollow: 0,
};

const FollowReducer = (state = initState, action) => {
  switch (action.type) {
    case followAction.GET_LIST_FOLLOW:
      return {
        ...state,
        isLoading: true,
      };
    case followAction.GET_LIST_FOLLOW_SUCCESS:
      return {
        ...state,
        followList: action?.payload?.results,
        totalFollow: action?.payload?.total,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default FollowReducer;
