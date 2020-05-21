import {
  GET_PRS,
  PR_ERROR,
  DELETE_PR,
  ADD_PR,
  GET_MYPRS,
  GET_PR,
} from '../actions/types';

const initialState = {
  prs: [],
  pr: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRS:
      return {
        ...state,
        prs: payload,
        loading: false,
      };
    case GET_PR:
      return {
        ...state,
        pr: payload,
        loading: false,
      };
    case GET_MYPRS:
      return {
        ...state,
        prs: payload,
        loading: false,
      };
    case ADD_PR:
      return {
        ...state,
        prs: [payload, ...state.prs],
        loading: false,
      };
    case DELETE_PR:
      return {
        ...state,
        prs: state.prs.filter((pr) => pr._id !== payload),
        loading: false,
      };
    case PR_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
