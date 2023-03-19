import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import reducer from '../reducers';

import userMiddleware from '../middlewares/userMiddleware';
import advicesMiddleware from '../middlewares/advicesMiddleware';
import articlesMiddleware from '../middlewares/articlesMiddleware';
import commonMiddleware from '../middlewares/commonMiddleware';

const enhancers = composeWithDevTools(
  applyMiddleware(
    userMiddleware,
    advicesMiddleware,
    articlesMiddleware,
    commonMiddleware,
  ),
);

const configureStore = () => {
  const store = createStore(reducer, enhancers);
  return store;
};

export default configureStore;
