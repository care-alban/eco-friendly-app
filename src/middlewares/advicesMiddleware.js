import axios from 'axios';

import {
  GET_ADVICES,
  getAdvicesSuccess,
  getAdvicesError,
} from '../actions/advicesActions';

import config from '../config';
import data from '../data';

const advicesMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_ADVICES:
      if (config.env === 'dev') {
        store.dispatch(getAdvicesSuccess(data.advices.home));
      } else {
        const { params } = action;
        const paramsString = params
          .map((param) => `${param.name}=${param.value}`)
          .join('&');
        axios
          .get(`${config.apiURL}/advices?${paramsString}`)
          .then((response) => {
            store.dispatch(getAdvicesSuccess(response.data));
          })
          .catch((error) => {
            store.dispatch(getAdvicesError(error));
          });
      }
      break;
    default:
  }
  next(action);
};

export default advicesMiddleware;
