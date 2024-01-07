import { CLEAR_ERROR, SET_ERROR } from "../actions/errorActions";

const initialState = {
  messageError: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, messageError: action.payload };
    case CLEAR_ERROR:
      return { ...state, messageError: null };
    default:
      return state;
  }
};

export default errorReducer;
