import {
  ON_INPUT_CHANGE,
  GET_ADVICES_SUCCESS,
  GET_ADVICES_ERROR,
  GET_ADVICE_SUCCESS,
  GET_ADVICE_ERROR,
  TOGGLE_SHOW_ADVICE_FORM,
  TO_MANAGE_ADVICE_SUCCESS,
  TO_MANAGE_ADVICE_ERROR,
  TO_DELETE_ADVICE_SUCCESS,
  TO_DELETE_ADVICE_ERROR,
} from '../actions/advicesActions';

export const initialState = {
  list: [],
  advice: {},
  messages: {
    success: [],
    error: [],
  },
  id: '',
  title: '',
  category: '',
  content: '',
  isSubmitted: false,
  showAdviceForm: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ON_INPUT_CHANGE:
      return {
        ...state,
        [action.identifier]: action.value,
      };
    case GET_ADVICES_SUCCESS:
      return {
        ...state,
        list: action.data,
      };
    case GET_ADVICES_ERROR:
      return {
        ...state,
        list: [],
      };
    case GET_ADVICE_SUCCESS:
      return {
        ...state,
        advice: action.advice,
      };
    case GET_ADVICE_ERROR:
      return {
        ...state,
        messages: {
          ...state.messages,
          error: action.error.response.data.errors,
        },
      };
    case TOGGLE_SHOW_ADVICE_FORM:
      return {
        ...state,
        id: action.advice.id || '',
        title: action.advice.title || '',
        category: action.advice.category ? action.advice.category.id : '',
        content: action.advice.content || '',
        advice: action.advice || {},
        showAdviceForm: !state.showAdviceForm,
      };
    case TO_MANAGE_ADVICE_SUCCESS:
      return {
        ...state,
        advice: action.advice,
        list: state.list.map((advice) => {
          if (advice.id === action.advice.id) {
            return action.advice;
          }
          return advice;
        }),
        messages: {
          ...state.messages,
          success: [
            `Bravo ! Votre conseil a bien été ${
              action.advice.status ? 'enregistré' : 'publié'
            }.`,
          ],
        },
        title: '',
        category: '',
        content: '',
        isSubmitted: true,
      };
    case TO_MANAGE_ADVICE_ERROR:
      return {
        ...state,
        advice: {},
        messages: {
          ...state.messages,
          error: action.error.response.data.errors,
        },
      };
    case TO_DELETE_ADVICE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((advice) => advice.id !== action.id),
        messages: {
          ...state.messages,
          success: ['Votre conseil a bien été supprimé.'],
        },
      };
    case TO_DELETE_ADVICE_ERROR:
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
