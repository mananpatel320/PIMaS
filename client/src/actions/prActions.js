import axios from 'axios';
import { GET_PRS, PR_ERROR } from './types';

// Get prs
export const getPRS = () => async (dispatch) => {
  try {
    const res = await axios.get('api/pr');

    dispatch({
      type: GET_PRS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
