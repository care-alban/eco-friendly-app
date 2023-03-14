/**
 * @name getArticles
 * @description Get articles
 * @param {Number} limit Limit of articles
 * @param {String} sorttype Sort type
 * @param {String} order Order type (ASC or DESC)
 * @param {Number} category Category id
 * @returns {Object} Action
 */
export const GET_ARTICLES = 'GET_ARTICLES';

export const getArticles = (
  limit = 1,
  sorttype = 'created_at',
  order = 'DESC',
  category = 1,
) => ({
  type: GET_ARTICLES,
  limit,
  sorttype,
  order,
  category,
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
