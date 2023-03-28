import {
  SEARCH_BAR_ON_CHANGE,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_ERROR,
  GET_QUIZ_QUESTION_SUCCESS,
  GET_QUIZ_QUESTION_ERROR,
} from '../actions/commonActions';

export const initialState = {
  categories: [],
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
        categories: [
          {
            id: 1,
            name: 'Mobilité',
            tagline: 'Nisi repudiandae explicabo velit culpa.',
            slug: 'mobilite',
          },
          {
            id: 2,
            name: 'Maison',
            tagline: 'Quas placeat autem et dolores quos.',
            slug: 'maison',
          },
          {
            id: 3,
            name: 'Santé',
            tagline: 'Veritatis aut saepe quia error quia maiores sed.',
            slug: 'sante',
          },
          {
            id: 4,
            name: 'Energie',
            tagline: 'Consequatur ipsam porro porro temporibus.',
            slug: 'energie',
          },
        ],
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
