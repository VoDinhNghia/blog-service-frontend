import { combineReducers } from "redux";
import PostReducer from "./post/reducer";
import UserReducer from "./user/reducer";
import StudySpaceReducer from "./study-space/reducer";
import FollowReducer from "./follow/reducer";
import MessageReducer from "./message/reducer";

const rootReducer = combineReducers({
    PostReducer: PostReducer,
    UserReducer: UserReducer,
    StudySpaceReducer: StudySpaceReducer,
    FollowReducer: FollowReducer,
    MessageReducer: MessageReducer,
});

export default rootReducer;