import {
  ON_INPUT_CHANGE,
  ON_SIGN_IN_SUCCESS,
  ON_SIGN_IN_ERROR,
  ON_SIGN_UP_SUCCESS,
  ON_SIGN_UP_ERROR,
} from '../actions/userActions';

export const initialState = {
  isLogged: false,
  isRegistered: false,
  token: '',
  user: null,
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
  register: {
    email: '',
    nickname: '',
  },
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
        email: '',
        password: '',
      };
    case ON_SIGN_IN_ERROR:
      return {
        ...state,
        messages: {
          ...state.messages,
          error: action.error.response.data.errors,
        },
      };
    case ON_SIGN_UP_SUCCESS:
      return {
        ...state,
        register: {
          email: action.email,
          nickname: action.nickname,
        },
        messages: {
          ...state.messages,
          success: ['Félicitaions, un mail de confirmation vous a été envoyé'],
        },
        isRegistered: true,
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
      };
    case ON_SIGN_UP_ERROR:
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
