import axios from 'axios';
import {
  ON_SIGN_IN,
  onSignInSuccess,
  onSignInError,
  ON_SIGN_UP,
  onSignUpSuccess,
  onSignUpError,
  ON_GET_ADVICES,
  onGetAdvicesSuccess,
  onGetAdvicesError,
  ON_SETTINGS_UPDATE,
  onSettingsUpdateSuccess,
  onSettingsUpdateError,
  ON_EMAIL_UPDATE,
  onEmailUpdateSuccess,
  onEmailUpdateError,
  ON_EMAIL_VERIFICATION,
  onEmailVerificationSuccess,
  onEmailVerificationError,
  ON_PASSWORD_UPDATE,
  onPasswordUpdateSuccess,
  onPasswordUpdateError,
  ON_DELETE_ACCOUNT,
  onDeleteAccountSuccess,
  onDeleteAccountError,
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
    case ON_SIGN_UP:
      if (config.env === 'dev') {
        store.dispatch(onSignUpSuccess(data.user.email, data.user.nickname));
      } else {
        axios
          .post(`${config.apiURL}/signup`, {
            email: action.email,
            password: action.password,
            nickname: action.nickname,
          })
          .then((response) => {
            store.dispatch(
              onSignUpSuccess(response.data.email, response.data.nickname),
            );
          })
          .catch((error) => {
            store.dispatch(onSignUpError(error));
          });
      }
      break;
    case ON_GET_ADVICES:
      if (config.env === 'dev') {
        store.dispatch(onGetAdvicesSuccess(data.user.advices));
      } else {
        axios
          .get(`${config.apiURL}/users/${store.getState().user.data.id}`, {
            headers: {
              Authorization: `Bearer ${store.getState().user.token}`,
            },
          })
          .then((response) => {
            store.dispatch(onGetAdvicesSuccess(response.data.advices));
          })
          .catch((error) => {
            store.dispatch(onGetAdvicesError(error));
          });
      }
      break;
    case ON_SETTINGS_UPDATE:
      if (config.env === 'dev') {
        store.dispatch(onSettingsUpdateSuccess());
      } else {
        axios
          .put(
            `${config.apiURL}/users/${store.getState().user.data.id}`,
            {
              email: store.getState().user.email,
              nickname: store.getState().user.nickname,
              firstname: store.getState().user.firstname,
              lastname: store.getState().user.lastname,
              avatar: store.getState().user.avatar,
            },
            {
              headers: {
                Authorization: `Bearer ${store.getState().user.token}`,
              },
            },
          )
          .then((response) => {
            store.dispatch(onSettingsUpdateSuccess(response.data));
          })
          .catch((error) => {
            store.dispatch(onSettingsUpdateError(error));
          });
      }
      break;
    case ON_EMAIL_UPDATE:
      axios
        .post(
          `${config.apiURL}/users/${
            store.getState().user.data.id
          }/email-update`,
          {
            email: store.getState().user.email,
          },
          {
            headers: {
              Authorization: `Bearer ${store.getState().user.token}`,
            },
          },
        )
        .then((response) => {
          store.dispatch(
            onEmailUpdateSuccess(response.data.email, response.data.nickname),
          );
        })
        .catch((error) => {
          store.dispatch(onEmailUpdateError(error));
        });
      break;
    case ON_EMAIL_VERIFICATION:
      axios
        .post(
          `${config.apiURL}/reset-password`,
          {
            email: store.getState().user.data.email,
          },
          {
            headers: {
              Authorization: `Bearer ${store.getState().user.token}`,
            },
          },
        )
        .then(() => {
          store.dispatch(onEmailVerificationSuccess());
        })
        .catch((error) => {
          store.dispatch(onEmailVerificationError(error));
        });
      break;
    case ON_PASSWORD_UPDATE:
      if (action.token === null || action.token === '') {
        store.dispatch(onPasswordUpdateError(null));
      } else {
        axios
          .post(
            `${config.apiURL}/reset-password/reset/${action.token.replace(
              /"/g,
              '',
            )}`,
            {
              password: store.getState().user.password,
            },
            {
              headers: {
                Authorization: `Bearer ${store.getState().user.token}`,
              },
            },
          )
          .then(() => {
            store.dispatch(onPasswordUpdateSuccess());
          })
          .catch((error) => {
            store.dispatch(onPasswordUpdateError(error.response.data.errors));
          });
      }
      break;
    case ON_DELETE_ACCOUNT:
      axios
        .delete(`${config.apiURL}/users/${store.getState().user.data.id}`, {
          headers: {
            Authorization: `Bearer ${store.getState().user.token}`,
          },
        })
        .then(() => {
          store.dispatch(onDeleteAccountSuccess());
        })
        .catch((error) => {
          store.dispatch(onDeleteAccountError(error));
        });
      break;
    default:
  }
  next(action);
};

export default userMiddleware;
