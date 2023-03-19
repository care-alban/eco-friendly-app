/**
 * @name onInputChange
 * @description Action creator for input change
 * @param {string} value
 * @param {string} identifier
 * @returns {object} action
 */
export const ON_INPUT_CHANGE = 'ON_INPUT_CHANGE';

export const onInputChange = (value, identifier) => ({
  type: ON_INPUT_CHANGE,
  value,
  identifier,
});

/**
 * @name onSignIn
 * @description Action creator for sign in
 * @param {string} email
 * @param {string} password
 * @returns {object} action
 */
export const ON_SIGN_IN = 'ON_SIGN_IN';

export const onSignIn = (email, password) => ({
  type: ON_SIGN_IN,
  email,
  password,
});

/**
 * @name onSignInSuccess
 * @description Action creator for sign in success
 * @param {object} user
 * @param {string} token
 * @returns {object} action
 */
export const ON_SIGN_IN_SUCCESS = 'ON_SIGN_IN_SUCCESS';

export const onSignInSuccess = (user, token) => ({
  type: ON_SIGN_IN_SUCCESS,
  user,
  token,
});

/**
 * @name onSignInError
 * @description Action creator for sign in error
 * @param {string} error
 * @returns {object} action
 */
export const ON_SIGN_IN_ERROR = 'ON_SIGN_IN_ERROR';

export const onSignInError = (error) => ({
  type: ON_SIGN_IN_ERROR,
  error,
});
