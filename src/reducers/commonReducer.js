import {
  SEARCH_BAR_ON_CHANGE,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_ERROR,
  GET_AVATARS_SUCCESS,
  GET_AVATARS_ERROR,
  GET_QUIZ_QUESTION_SUCCESS,
  GET_QUIZ_QUESTION_ERROR,
} from '../actions/commonActions';

import data from '../data';

export const initialState = {
  categories: [],
  avatars: [],
  quiz: {},
  searchValue: '',
  messages: {
    success: [],
    error: [],
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_BAR_ON_CHANGE:
      return {
        ...state,
        searchValue: action.value,
      };
    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.categories,
      };
    case GET_ALL_CATEGORIES_ERROR:
      return {
        ...state,
        categories: data.categories,
      };
    case GET_AVATARS_SUCCESS:
      return {
        ...state,
        avatars: action.avatars,
      };
    case GET_AVATARS_ERROR:
      return {
        ...state,
        avatars: data.avatars,
      };
    case GET_QUIZ_QUESTION_SUCCESS:
      return {
        ...state,
        quiz: action.data,
      };
    case GET_QUIZ_QUESTION_ERROR:
      return {
        ...state,
        messages: {
          ...state.messages,
          error: action.error.response.data.errors,
        },
      };
    default:
      return state;
  }
};

export default reducer;
