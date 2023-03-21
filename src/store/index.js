import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import reducer from '../reducers';

import userMiddleware from '../middlewares/userMiddleware';
import advicesMiddleware from '../middlewares/advicesMiddleware';
import articlesMiddleware from '../middlewares/articlesMiddleware';
import commonMiddleware from '../middlewares/commonMiddleware';

import { loadState, saveState, throttle } from '../utils/sessionStorage';

const enhancers = composeWithDevTools(
  applyMiddleware(
    userMiddleware,
    advicesMiddleware,
    articlesMiddleware,
    commonMiddleware,
  ),
);

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(reducer, enhancers, persistedState);

  store.subscribe(
    throttle(() => {
      saveState('user', store.getState().user.data);
      saveState('token', store.getState().user.token);
      saveState('advices', store.getState().user.advices);
    }, 1000),
  );

  return store;
};

export default configureStore;
