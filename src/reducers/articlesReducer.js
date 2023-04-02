import {
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_ERROR,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_ERROR,
} from '../actions/articlesActions';

export const initialState = {
  list: [],
  listPerPage: [],
  page: 1,
  article: null,
  messages: {
    success: null,
    error: null,
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ARTICLES_SUCCESS:
      if (action.page) {
        return {
          ...state,
          listPerPage:
            action.page === 1
              ? action.data
              : [...state.listPerPage, ...action.data],
          page: action.page,
        };
      }
      return {
        ...state,
        list: action.data,
      };
    case GET_ARTICLES_ERROR:
      return {
        ...state,
        list: [],
      };
    case GET_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.data,
      };
    case GET_ARTICLE_ERROR:
      return {
        ...state,
        messages: {
          ...state.messages,
          error: action.error,
        },
      };
    default:
      return state;
  }
};

export default reducer;
