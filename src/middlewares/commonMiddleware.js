import axios from 'axios';

import {
  GET_ALL_CATEGORIES,
  getAllCategoriesSuccess,
  getAllCategoriesError,
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
    default:
  }
  next(action);
};

export default commonMiddleware;
