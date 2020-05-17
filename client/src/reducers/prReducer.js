import { GET_PRS, PR_ERROR } from '../actions/types';

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
