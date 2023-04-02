import {
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_ERROR,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_ERROR,
} from '../actions/articlesActions';

export const initialState = {
  list: [],
  articlesFiltered: [],
  filtersParams: {
    page: 1,
    category: 'All',
    sortBy: 'desc',
    search: '',
  },
  article: null,
  messages: {
    success: null,
    error: null,
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ARTICLES_SUCCESS: {
      const { params } = action;
      const page = params.find((param) => param.name === 'page');
      if (page) {
        const category = params.find((param) => param.name === 'category');
        const sortBy = params.find((param) => param.name === 'order');
        const search = params.find((param) => param.name === 'search');
        return {
          ...state,
          filtersParams: {
            ...state.filtersParams,
            page: page.value,
            category: category ? category.value : 'All',
            sortBy: sortBy ? sortBy.value : 'desc',
            search: search ? search.value : '',
          },
          articlesFiltered:
            page.value === 1
              ? action.data
              : [...state.articlesFiltered, ...action.data],
          list: [],
        };
      }
      return {
        ...state,
        list: action.data,
      };
    }
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
