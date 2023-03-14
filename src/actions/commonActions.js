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
