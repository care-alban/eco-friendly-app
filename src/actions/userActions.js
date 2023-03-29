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
 * @param {array} error
 * @returns {object} action
 */
export const ON_SIGN_IN_ERROR = 'ON_SIGN_IN_ERROR';

export const onSignInError = (error) => ({
  type: ON_SIGN_IN_ERROR,
  error,
});

/**
 * @name onLogOut
 * @description Action creator for log out
 * @returns {object} action
 */
export const ON_LOG_OUT = 'ON_LOG_OUT';

export const onLogOut = () => ({
  type: ON_LOG_OUT,
});

/**
 * @name onSignUp
 * @description Action creator for sign up
 * @param {string} email
 * @param {string} password
 * @param {string} nickname
 * @returns {object} action
 */
export const ON_SIGN_UP = 'ON_SIGN_UP';

export const onSignUp = (email, password, nickname) => ({
  type: ON_SIGN_UP,
  email,
  password,
  nickname,
});

/**
 * @name onSignUpSuccess
 * @description Action creator for sign up success
 * @param {string} email
 * @param {string} nickname
 * @returns {object} action
 */
export const ON_SIGN_UP_SUCCESS = 'ON_SIGN_UP_SUCCESS';

export const onSignUpSuccess = (email, nickname) => ({
  type: ON_SIGN_UP_SUCCESS,
  email,
  nickname,
});

/**
 * @name onSignUpError
 * @description Action creator for sign up error
 * @param {error} error
 * @returns {object} action
 */
export const ON_SIGN_UP_ERROR = 'ON_SIGN_UP_ERROR';

export const onSignUpError = (error) => ({
  type: ON_SIGN_UP_ERROR,
  error,
});

/**
 * @name onGetAdvices
 * @description Action creator for get user advices
 * @param {string} token
 * @returns {object} action
 */
export const ON_GET_ADVICES = 'ON_GET_ADVICES';

export const onGetAdvices = (token) => ({
  type: ON_GET_ADVICES,
  token,
});

/**
 * @name onGetAdvicesSuccess
 * @description Action creator for get user advices success
 * @param {array} advices
 * @returns {object} action
 */
export const ON_GET_ADVICES_SUCCESS = 'ON_GET_ADVICES_SUCCESS';

export const onGetAdvicesSuccess = (advices) => ({
  type: ON_GET_ADVICES_SUCCESS,
  advices,
});

/**
 * @name onGetAdvicesError
 * @description Action creator for get user advices error
 * @param {error} error
 * @returns {object} action
 */
export const ON_GET_ADVICES_ERROR = 'ON_GET_ADVICES_ERROR';

export const onGetAdvicesError = (error) => ({
  type: ON_GET_ADVICES_ERROR,
  error,
});

/**
 * @name onSettingsUpdate
 * @description Action creator for update user settings
 * @returns {object} action
 */
export const ON_SETTINGS_UPDATE = 'ON_SETTINGS_UPDATE';

export const onSettingsUpdate = () => ({
  type: ON_SETTINGS_UPDATE,
});

/**
 * @name onSettingsUpdateSuccess
 * @description Action creator for update user settings success
 * @param {object} user
 * @returns {object} action
 */
export const ON_SETTINGS_UPDATE_SUCCESS = 'ON_SETTINGS_UPDATE_SUCCESS';

export const onSettingsUpdateSuccess = (user) => ({
  type: ON_SETTINGS_UPDATE_SUCCESS,
  user,
});

/**
 * @name onSettingsUpdateError
 * @description Action creator for update user settings error
 * @param {error} error
 * @returns {object} action
 */
export const ON_SETTINGS_UPDATE_ERROR = 'ON_SETTINGS_UPDATE_ERROR';

export const onSettingsUpdateError = (error) => ({
  type: ON_SETTINGS_UPDATE_ERROR,
  error,
});
