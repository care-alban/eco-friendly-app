/**
 * @name getArticles
 * @description Get articles
 * @param {Array} params Params to send
 * @returns {Object} Action
 */
export const GET_ARTICLES = 'GET_ARTICLES';

export const getArticles = (params = []) => ({
  type: GET_ARTICLES,
  params,
});

/**
 * @name getArticlesSuccess
 * @description Get articles success
 * @param {Object} data Data
 * @returns {Object} Action
 */
export const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';

export const getArticlesSuccess = (data) => ({
  type: GET_ARTICLES_SUCCESS,
  data,
});

/**
 * @name getArticlesError
 * @description Get articles error
 * @param {Object} error Error
 * @returns {Object} Action
 */
export const GET_ARTICLES_ERROR = 'GET_ARTICLES_ERROR';

export const getArticlesError = (error) => ({
  type: GET_ARTICLES_ERROR,
  error,
});
