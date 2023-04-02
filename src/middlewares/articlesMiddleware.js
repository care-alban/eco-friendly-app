import axios from 'axios';

import {
  GET_ARTICLES,
  getArticlesSuccess,
  getArticlesError,
  GET_ARTICLE,
  getArticleSuccess,
  getArticleError,
} from '../actions/articlesActions';

import config from '../config';
import data from '../data';

const articlesMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_ARTICLES:
      if (config.env === 'dev') {
        store.dispatch(getArticlesSuccess(data.articles));
      } else {
        const { params } = action;
        const paramsString = params
          .map((param) => `${param.name}=${param.value}`)
          .join('&');
        const page = params.find((p) => p.name === 'page');
        axios
          .get(`${config.apiURL}/articles?${paramsString}`)
          .then((response) => {
            if (page) {
              store.dispatch(getArticlesSuccess(response.data, page.value));
              return;
            }
            store.dispatch(getArticlesSuccess(response.data));
          })
          .catch((error) => {
            store.dispatch(getArticlesError(error));
          });
      }
      break;
    case GET_ARTICLE:
      if (config.env === 'dev') {
        const article = data.articles.find((a) => a.id === action.id);
        store.dispatch(getArticleSuccess(article));
      } else {
        axios
          .get(`${config.apiURL}/articles/${action.id}`)
          .then((response) => {
            store.dispatch(getArticleSuccess(response.data));
          })
          .catch((error) => {
            store.dispatch(getArticleError(error));
          });
      }
      break;
    default:
  }
  next(action);
};

export default articlesMiddleware;
