import axios from 'axios';
import {
  GET_PRS,
  PR_ERROR,
  DELETE_PR,
  ADD_PR,
  GET_MYPRS,
  GET_PR,
  REMOVE_MATERIAL,
  ADD_MATERIAL,
} from './types';

// Get prs
export const getPRS = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/pr/allprs');

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

// Get My prs
export const getMyPRS = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/pr/myprs');

    dispatch({
      type: GET_MYPRS,
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

//Get PR
export const getPR = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/pr/viewpr/${id}`);

    dispatch({
      type: GET_PR,
      payload: res.data,
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
  try {
    const res = await axios.post('/api/pr/add', formData);
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

//Add material
export const addMaterial = (prId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/pr/material/${prId}`, formData);
    dispatch({
      type: ADD_MATERIAL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete material
export const deleteMaterial = (prId, materialId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/pr/material/${prId}/${materialId}`);

    dispatch({
      type: REMOVE_MATERIAL,
      payload: materialId,
    });
  } catch (err) {
    dispatch({
      type: PR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
