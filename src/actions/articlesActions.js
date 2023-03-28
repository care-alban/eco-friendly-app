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

/**
 * @name getArticle
 * @description Get article
 * @param {Number} id Id
 * @returns {Object} Action
 */
export const GET_ARTICLE = 'GET_ARTICLE';

export const getArticle = (id) => ({
  type: GET_ARTICLE,
  id,
});

/**
 * @name getArticleSuccess
 * @description Get article success
 * @param {Object} data Data
 * @returns {Object} Action
 */
export const GET_ARTICLE_SUCCESS = 'GET_ARTICLE_SUCCESS';

export const getArticleSuccess = (data) => ({
  type: GET_ARTICLE_SUCCESS,
  data,
});

/**
 * @name getArticleError
 * @description Get article error
 * @param {Object} error Error
 * @returns {Object} Action
 */
export const GET_ARTICLE_ERROR = 'GET_ARTICLE_ERROR';

export const getArticleError = (error) => ({
  type: GET_ARTICLE_ERROR,
  error,
});
