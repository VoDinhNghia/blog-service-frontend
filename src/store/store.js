import { useDispatch } from "react-redux";
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducer.store";
import { rootSagas } from "./saga.store";

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = compose(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, bindMiddleware);

export const useAppDispatch = () => useDispatch();

sagaMiddleware.run(rootSagas);

export default store;
