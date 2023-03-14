import {
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_ERROR,
} from '../actions/articlesActions';

export const initialState = {
  list: [],
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
    default:
      return state;
  }
};

export default reducer;
