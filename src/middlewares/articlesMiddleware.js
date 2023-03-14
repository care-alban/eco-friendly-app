import axios from 'axios';

import {
  GET_ARTICLES,
  getArticlesSuccess,
  getArticlesError,
} from '../actions/articlesActions';

import config from '../config';
import data from '../data';

const articlesMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_ARTICLES:
      if (config.env === 'dev') {
        store.dispatch(getArticlesSuccess(data.articles.home));
      } else {
        const { limit, sorttype, order, category } = action;
        axios
          .get(
            `${config.apiURL}/articles?limit=${limit}&sorttype=${sorttype}&order=${order}&category=${category}`,
          )
          .then((response) => {
            store.dispatch(getArticlesSuccess(response.data));
          })
          .catch((error) => {
            store.dispatch(getArticlesError(error));
          });
      }
      break;
    default:
  }
  next(action);
};

export default articlesMiddleware;
