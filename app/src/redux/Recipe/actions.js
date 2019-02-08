import axios from 'axios';
import { serverUrl, STATUS } from '../../constants/global';

const { SUCCESS, FAILURE } = STATUS;

export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const SET_ERROR = 'SET_ERROR';

export const requestIngredients = () => dispatch => {
  axios
    .get(`${serverUrl}/ingredients`)
    .then(({ data }) => {
        dispatch(setIngredients(data));
    })
    .catch(err => {
      console.log(err)
      // dispatch(setError(err.response.data));
    });
};


export const setIngredients = ingredients => ({
  type: SET_INGREDIENTS,
  ingredients
});

export const setError = error => ({
  type: SET_ERROR,
  error
});
