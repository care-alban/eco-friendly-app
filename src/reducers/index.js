import { combineReducers } from 'redux';

import userReducer from './userReducer';
import advicesReducer from './advicesReducer';
import articlesReducer from './articlesReducer';
import commonReducer from './commonReducer';

const rootReducer = combineReducers({
  user: userReducer,
  advices: advicesReducer,
  articles: articlesReducer,
  common: commonReducer,
});

export default rootReducer;
