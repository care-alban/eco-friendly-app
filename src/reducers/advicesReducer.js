import {
  GET_ADVICES_SUCCESS,
  GET_ADVICES_ERROR,
} from '../actions/advicesActions';

export const initialState = {
  list: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default reducer;
