/**
 * @name getAllCategories
 * @description Get all categories
 * @returns {Object} Action
 */
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';

export const getAllCategories = () => ({
  type: GET_ALL_CATEGORIES,
});

/**
 * @name getAllCategoriesSuccess
 * @description Get all categories success
 * @param {Object} categories Categories
 * @returns {Object} Action
 */
export const GET_ALL_CATEGORIES_SUCCESS = 'GET_ALL_CATEGORIES_SUCCESS';

export const getAllCategoriesSuccess = (categories) => ({
  type: GET_ALL_CATEGORIES_SUCCESS,
  categories,
});

/**
 * @name getAllCategoriesError
 * @description Get all categories error
 * @param {Object} error Error
 * @returns {Object} Action
 */
export const GET_ALL_CATEGORIES_ERROR = 'GET_ALL_CATEGORIES_ERROR';

export const getAllCategoriesError = (error) => ({
  type: GET_ALL_CATEGORIES_ERROR,
  error,
});

/**
 * @name getAvatars
 * @description Get avatars
 * @returns {Object} Action
 */
export const GET_AVATARS = 'GET_AVATARS';

export const getAvatars = () => ({
  type: GET_AVATARS,
});

/**
 * @name getAvatarsSuccess
 * @description Get avatars success
 * @param {Object} avatars Avatars
 * @returns {Object} Action
 */
export const GET_AVATARS_SUCCESS = 'GET_AVATARS_SUCCESS';

export const getAvatarsSuccess = (avatars) => ({
  type: GET_AVATARS_SUCCESS,
  avatars,
});

/**
 * @name getAvatarsError
 * @description Get avatars error
 * @param {Object} error Error
 * @returns {Object} Action
 */
export const GET_AVATARS_ERROR = 'GET_AVATARS_ERROR';

export const getAvatarsError = (error) => ({
  type: GET_AVATARS_ERROR,
  error,
});

/**
 * @name getQuizQuestion
 * @description Get quiz question
 * @returns {Object} Action
 */
export const GET_QUIZ_QUESTION = 'GET_QUIZ_QUESTION';

export const getQuizQuestion = () => ({
  type: GET_QUIZ_QUESTION,
});

/**
 * @name getQuizQuestionSuccess
 * @description Get quiz question success
 * @param {Array} question Question
 * @returns {Object} Action
 */
export const GET_QUIZ_QUESTION_SUCCESS = 'GET_QUIZ_QUESTION_SUCCESS';

export const getQuizQuestionSuccess = (data) => ({
  type: GET_QUIZ_QUESTION_SUCCESS,
  data,
});

/**
 * @name getQuizQuestionError
 * @description Get quiz question error
 * @param {Object} error Error
 * @returns {Object} Action
 */
export const GET_QUIZ_QUESTION_ERROR = 'GET_QUIZ_QUESTION_ERROR';

export const getQuizQuestionError = (error) => ({
  type: GET_QUIZ_QUESTION_ERROR,
  error,
});

/**
 * @name searchBarOnChange
 * @description Search bar on change
 * @param {Object} event Event
 * @returns {Object} Action
 */
export const SEARCH_BAR_ON_CHANGE = 'SEARCH_BAR_ON_CHANGE';

export const searchBarOnChange = (value) => ({
  type: SEARCH_BAR_ON_CHANGE,
  value,
});

/**
 * @clearMessages
 * @description Action to clear messages
 * @returns {Object} action
 */
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});
