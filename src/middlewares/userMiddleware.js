import axios from 'axios';
import {
  ON_SIGN_IN,
  onSignInSuccess,
  onSignInError,
} from '../actions/userActions';

import config from '../config';
import data from '../data';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case ON_SIGN_IN:
      if (config.env === 'dev') {
        store.dispatch(onSignInSuccess(data.user, data.token));
      } else {
        axios
          .post(`${config.apiURL}/signin`, {
            username: action.email,
            password: action.password,
          })
          .then((response) => {
            store.dispatch(
              onSignInSuccess(response.data.user, response.data.token),
            );
          })
          .catch((error) => {
            store.dispatch(onSignInError(error));
          });
      }
      break;
    default:
  }
  next(action);
};

export default userMiddleware;
