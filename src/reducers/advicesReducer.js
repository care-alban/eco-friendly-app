import {
  ON_INPUT_CHANGE,
  GET_ADVICES_SUCCESS,
  GET_ADVICES_ERROR,
  TO_MANAGE_ADVICE_SUCCESS,
  TO_MANAGE_ADVICE_ERROR,
} from '../actions/advicesActions';

export const initialState = {
  list: [],
  advice: {},
  messages: {
    success: [],
    error: [],
  },
  title: '',
  category: '',
  content: '',
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
    case TO_MANAGE_ADVICE_SUCCESS:
      return {
        ...state,
        advice: action.advice,
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
    default:
      return state;
  }
};

export default reducer;
