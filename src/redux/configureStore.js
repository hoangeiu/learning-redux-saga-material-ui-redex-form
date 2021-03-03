import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./../saga";

const composeEnhancers =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  // eslint-disable-next-line no-undef
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? // eslint-disable-next-line no-undef
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false
      })
    : compose;

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const middleWares = [thunk, sagaMiddleware]; //
  const enhancers = [applyMiddleware(...middleWares)];
  const store = createStore(rootReducer, composeEnhancers(...enhancers));
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
