import axios from 'axios';

import {
  GET_ALL_CATEGORIES,
  getAllCategoriesSuccess,
  getAllCategoriesError,
  GET_QUIZ_QUESTION,
  getQuizQuestionSuccess,
  getQuizQuestionError,
} from '../actions/commonActions';

import config from '../config';
import data from '../data';

const commonMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      if (config.env === 'dev') {
        store.dispatch(getAllCategoriesSuccess(data.categories));
      } else {
        axios
          .get(`${config.apiURL}/categories`)
          .then((response) => {
            store.dispatch(getAllCategoriesSuccess(response.data));
          })
          .catch((error) => {
            store.dispatch(getAllCategoriesError(error));
          });
      }
      break;
    case GET_QUIZ_QUESTION:
      if (config.env === 'dev') {
        store.dispatch(getQuizQuestionSuccess(data.quizz));
      } else {
        axios
          .get(`${config.apiURL}/quizzes/random`)
          .then((response) => {
            store.dispatch(getQuizQuestionSuccess(response.data));
          })
          .catch((error) => {
            store.dispatch(getQuizQuestionError(error));
          });
      }
      break;
    default:
  }
  next(action);
};

export default commonMiddleware;
