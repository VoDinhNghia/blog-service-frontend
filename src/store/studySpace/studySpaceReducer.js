import { studySpaceAction } from "../action";

const initState = {
  groupList: [],
  totalGroup: 0,
  topicInfo: {},
};

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
    case studySpaceAction.GET_TOPIC_BY_ID_SUCCESS:
      return {
        ...state,
        topicInfo: action?.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default StudySpaceReducer;
