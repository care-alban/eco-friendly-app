/**
 * @name getAdvices
 * @description Get advices
 * @param {Array} params Params to send
 * @returns {Object} Action
 */
export const GET_ADVICES = 'GET_ADVICES';

export const getAdvices = (params = []) => ({
  type: GET_ADVICES,
  params,
});

/**
 * @name getAdvicesSuccess
 * @description Get advices success
 * @param {Object} data Data
 * @returns {Object} Action
 */
export const GET_ADVICES_SUCCESS = 'GET_ADVICES_SUCCESS';

export const getAdvicesSuccess = (data) => ({
  type: GET_ADVICES_SUCCESS,
  data,
});

/**
 * @name getAdvicesError
 * @description Get advices error
 * @param {Object} error Error
 * @returns {Object} Action
 */
export const GET_ADVICES_ERROR = 'GET_ADVICES_ERROR';

export const getAdvicesError = (error) => ({
  type: GET_ADVICES_ERROR,
  error,
});
