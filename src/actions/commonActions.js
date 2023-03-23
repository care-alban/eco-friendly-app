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
 * @name toggleShowAdviceForm
 * @description Toggle show advice form
 * @returns {Object} Action
 */
export const TOGGLE_SHOW_ADVICE_FORM = 'TOGGLE_SHOW_ADVICE_FORM';

export const toggleShowAdviceForm = () => ({
  type: TOGGLE_SHOW_ADVICE_FORM,
});
