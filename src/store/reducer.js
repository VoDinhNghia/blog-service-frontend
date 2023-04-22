import { combineReducers } from "redux";
import PostReducer from "./post/postReducer";
import UserReducer from "./user/userReducer";
import StudySpaceReducer from "./studySpace/studySpaceReducer";
import FollowReducer from "./follow/followReducer";
import MessageReducer from "./message/messageReducer";

const rootReducer = combineReducers({
    PostReducer: PostReducer,
    UserReducer: UserReducer,
    StudySpaceReducer: StudySpaceReducer,
    FollowReducer: FollowReducer,
    MessageReducer: MessageReducer,
});

export default rootReducer;