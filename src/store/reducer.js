import { combineReducers } from "redux";
import PostReducer from "./post/postReducer";
import UserReducer from "./user/userReducer";
import StudySpaceReducer from "./studySpace/studySpaceReducer";

const rootReducer = combineReducers({
    PostReducer: PostReducer,
    UserReducer: UserReducer,
    StudySpaceReducer: StudySpaceReducer,
});

export default rootReducer;