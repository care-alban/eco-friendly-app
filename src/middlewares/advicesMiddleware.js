import axios from 'axios';

import {
  GET_ADVICES,
  getAdvicesSuccess,
  getAdvicesError,
  TO_MANAGE_ADVICE,
  toManageAdviceSuccess,
  toManageAdviceError,
} from '../actions/advicesActions';

import config from '../config';
import data from '../data';

const advicesMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_ADVICES:
      if (config.env === 'dev') {
        store.dispatch(getAdvicesSuccess(data.advices));
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
    case TO_MANAGE_ADVICE:
      if (config.env === 'dev') {
        store.dispatch(toManageAdviceSuccess(data.addedAdvice));
      } else {
        const { advice, id, status } = action;
        if (id) {
          axios
            .put(
              `${config.apiURL}/advices/${id}`,
              {
                ...advice,
                status,
                contributor: store.getState().user.id,
              },
              {
                headers: {
                  Authorization: `Bearer ${store.getState().user.token}`,
                },
              },
            )
            .then((response) => {
              store.dispatch(toManageAdviceSuccess(response.data));
            })
            .catch((error) => {
              store.dispatch(toManageAdviceError(error));
            });
        } else {
          axios
            .post(
              `${config.apiURL}/advices`,
              {
                ...advice,
                status,
                contributor: store.getState().user.id,
              },
              {
                headers: {
                  Authorization: `Bearer ${store.getState().user.token}`,
                },
              },
            )
            .then((response) => {
              store.dispatch(toManageAdviceSuccess(response.data));
            })
            .catch((error) => {
              store.dispatch(toManageAdviceError(error));
            });
        }
      }
      break;
    default:
  }
  next(action);
};

export default advicesMiddleware;
