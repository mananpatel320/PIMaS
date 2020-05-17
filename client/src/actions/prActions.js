import axios from 'axios';
import { GET_PRS, PR_ERROR, DELETE_PR, ADD_PR } from './types';

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

//Delete pr
export const deletePR = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/pr/${id}`);

    dispatch({
      type: DELETE_PR,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: PR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add pr
export const addPR = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/pr/', formData, config);

    dispatch({
      type: ADD_PR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
