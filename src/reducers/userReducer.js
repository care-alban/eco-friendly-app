import {
  ON_INPUT_CHANGE,
  ON_SIGN_IN_SUCCESS,
  ON_SIGN_IN_ERROR,
} from '../actions/userActions';

export const initialState = {
  isLogged: false,
  user: null,
  email: '',
  password: '',
  confirmPassword: '',
  nickname: '',
  messages: {
    success: [],
    error: [],
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ON_INPUT_CHANGE:
      return {
        ...state,
        [action.identifier]: action.value,
      };
    case ON_SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.user,
        token: action.token,
        messages: {
          ...state.messages,
          success: ['Connexion réussie'],
        },
        isLogged: true,
      };
    case ON_SIGN_IN_ERROR:
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
