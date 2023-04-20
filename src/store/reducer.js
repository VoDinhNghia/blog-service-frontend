import { combineReducers } from "redux";
import PostReducer from "./post/postReducer";
import UserReducer from "./user/userReducer";
import StudySpaceReducer from "./studySpace/studySpaceReducer";
import FollowReducer from "./follow/followReducer";

const rootReducer = combineReducers({
    PostReducer: PostReducer,
    UserReducer: UserReducer,
    StudySpaceReducer: StudySpaceReducer,
    FollowReducer: FollowReducer,
});

export default rootReducer;