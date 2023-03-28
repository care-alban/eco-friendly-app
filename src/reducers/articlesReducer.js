import {
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_ERROR,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_ERROR,
} from '../actions/articlesActions';

export const initialState = {
  list: [],
  article: {},
  messages: {
    success: [],
    error: [],
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ARTICLES_SUCCESS:
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
