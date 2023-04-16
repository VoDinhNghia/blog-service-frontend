import { studySpaceAction } from "../action";

const initState = {
  groupList: [],
  totalGroup: 0,
}

const StudySpaceReducer = (state = initState, action) => {
  switch (action.type) {
    case studySpaceAction.GET_ALL_GROUP:
      return {
        ...state,
        isLoading: true,
      };
    case studySpaceAction.GET_ALL_GROUP_SUCCESS:
      return {
        ...state,
        groupList: action?.payload?.results,
        totalGroup: action?.payload?.total,
      };
    default:
      return state;
  }
};

export default StudySpaceReducer;