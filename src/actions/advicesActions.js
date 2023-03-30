/**
 * @name advicesOnInputChange
 * @description Action creator for input change in advices
 * @param {string} value
 * @param {string} identifier
 * @returns {object} action
 */
export const ADVICES_ON_INPUT_CHANGE = 'ADVICES_ON_INPUT_CHANGE';

export const advicesOnInputChange = (value, identifier) => ({
  type: ADVICES_ON_INPUT_CHANGE,
  value,
  identifier,
});

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

/**
 * @name getAdvice
 * @description Get advice
 * @param {Number} id Advice id
 * @returns {Object} Action
 */
export const GET_ADVICE = 'GET_ADVICE';

export const getAdvice = (id) => ({
  type: GET_ADVICE,
  id,
});

/**
 * @name getAdviceSuccess
 * @description Get advice success
 * @param {Object} data Advice
 * @returns {Object} Action
 */
export const GET_ADVICE_SUCCESS = 'GET_ADVICE_SUCCESS';

export const getAdviceSuccess = (data) => ({
  type: GET_ADVICE_SUCCESS,
  data,
});

/**
 * @name getAdviceError
 * @description Get advice error
 * @param {Object} error Error
 * @returns {Object} Action
 */
export const GET_ADVICE_ERROR = 'GET_ADVICE_ERROR';

export const getAdviceError = (error) => ({
  type: GET_ADVICE_ERROR,
  error,
});

/**
 * @name toggleShowAdviceForm
 * @description Toggle show advice form
 * @param {Object} advice Advice
 * @returns {Object} Action
 */
export const TOGGLE_SHOW_ADVICE_FORM = 'TOGGLE_SHOW_ADVICE_FORM';

export const toggleShowAdviceForm = (advice = {}) => ({
  type: TOGGLE_SHOW_ADVICE_FORM,
  advice,
});

/**
 * @name toManageAdvice
 * @description To manage advice (edit or create, publish or save as draft) depending on the advice id and advice status
 * @param {Object} advice Advice
 * @param {Number} advice.id Advice id
 * @param {Number} advice.status Advice status (0: draft, 1: published)
 * @returns {Object} Action
 */
export const TO_MANAGE_ADVICE = 'TO_MANAGE_ADVICE';

export const toManageAdvice = (advice, id = null, status = 0) => ({
  type: TO_MANAGE_ADVICE,
  advice,
  id,
  status,
});

/**
 * @name toManageAdviceSuccess
 * @description To manage advice success
 * @param {Object} advice Advice
 * @returns {Object} Action
 */
export const TO_MANAGE_ADVICE_SUCCESS = 'TO_MANAGE_ADVICE_SUCCESS';

export const toManageAdviceSuccess = (advice) => ({
  type: TO_MANAGE_ADVICE_SUCCESS,
  advice,
});

/**
 * @name toManageAdviceError
 * @description To manage advice error
 * @param {Object} error Error
 * @returns {Object} Action
 */
export const TO_MANAGE_ADVICE_ERROR = 'TO_MANAGE_ADVICE_ERROR';

export const toManageAdviceError = (error) => ({
  type: TO_MANAGE_ADVICE_ERROR,
  error,
});

/**
 * @name toDeleteAdvice
 * @description To delete advice
 * @param {Number} id Advice id
 * @returns {Object} Action
 */
export const TO_DELETE_ADVICE = 'TO_DELETE_ADVICE';

export const toDeleteAdvice = (id) => ({
  type: TO_DELETE_ADVICE,
  id,
});

/**
 * @name toDeleteAdviceSuccess
 * @description To delete advice success
 * @param {Number} id Advice id
 * @returns {Object} Action
 */
export const TO_DELETE_ADVICE_SUCCESS = 'TO_DELETE_ADVICE_SUCCESS';

export const toDeleteAdviceSuccess = (id) => ({
  type: TO_DELETE_ADVICE_SUCCESS,
  id,
});

/**
 * @name toDeleteAdviceError
 * @description To delete advice error
 * @param {Object} error Error
 * @returns {Object} Action
 */
export const TO_DELETE_ADVICE_ERROR = 'TO_DELETE_ADVICE_ERROR';

export const toDeleteAdviceError = (error) => ({
  type: TO_DELETE_ADVICE_ERROR,
  error,
});
