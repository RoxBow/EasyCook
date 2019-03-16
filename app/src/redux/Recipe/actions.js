import axios from 'axios';
import { serverUrl, STATUS } from '../../constants/global';
import { getToken } from '../../constants/helpers';

const { SUCCESS, FAILURE } = STATUS;

export const RECIPE = "RECIPE";

export const SET_REF_DATA = `${RECIPE}/SET_REF_DATA`;
export const SET_ERROR = `${RECIPE}/SET_ERROR`;
export const UPDATE_RECIPES = `${RECIPE}/UPDATE_RECIPES`;
export const UPDATE_RECIPE = `${RECIPE}/UPDATE_RECIPE`;
export const ADD_RECIPE = `${RECIPE}/ADD_RECIPE`;

const axiosRecipe = axios.create({
  baseURL: `${serverUrl}/api/recipe`
});

axiosRecipe.interceptors.request.use(
  async options => {
    options.headers['Authorization'] = 'bearer ' + (await getToken());
    return options;
  },
  error => {
    console.log('Request error: ', error);
    return Promise.reject(error);
  }
);

export const fetchRefData = () => dispatch => {
  axios
    .get(`${serverUrl}/refData`)
    .then(({ data }) => {
      dispatch(setRefData(data));
    })
    .catch(err => {
      console.log(err);
      // dispatch(setError(err.response.data));
    });
};

export const fetchRecipes = () => {
  return dispatch => {
    axiosRecipe
      .get('/')
      .then(({ data }) => {
        dispatch(updateRecipes(data.recipes));
      })
      .catch(err => {});
  };
};

export const createRecipe = (
  name,
  category,
  level,
  preparationTime,
  cookingTime,
  steps,
  ingredients,
  equipments,
  image,
  navigation
) => {
  const body = new FormData();

  if (image) {
    body.append('file', {
      uri: image.uri,
      type: image.type,
      name: image.name || 'test'
    });
  }

  body.append('name', name);
  body.append('category', category);
  body.append('level', level);
  body.append('preparationTime', preparationTime);
  body.append('cookingTime', cookingTime);
  body.append('steps', JSON.stringify(steps));
  body.append('ingredients', JSON.stringify(ingredients));
  body.append('equipments', JSON.stringify(equipments));

  return dispatch =>
    axiosRecipe
      .put('/add', body, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(({ data }) => {
        if (data.status === SUCCESS) {
          dispatch(addRecipe(data.recipe));
          navigation.goBack();
        }
      })
      .catch(err => {
        //console.log(err);
        // dispatch(setError(err.response.data));
      });
};

export const addComment = (idRecipe, text, rating) => {
  return dispatch =>
    axiosRecipe
      .put('/comment/add', { idRecipe, text, rating })
      .then(({ data }) => {
        if (data.status === SUCCESS) {
          dispatch(updateRecipe(data.recipe));
        }
      })
      .catch(err => {
        //console.log(err);
        // dispatch(setError(err.response.data));
      });
};

export const deleteComment = (idRecipe, idComment) => {
  return dispatch =>
    axiosRecipe
      .post('/comment/delete', { idRecipe, idComment })
      .then(({ data }) => {
        if (data.status === SUCCESS) {
          dispatch(updateRecipe(data.recipe));
        }
      })
      .catch(err => {
        //console.log(err);
        // dispatch(setError(err.response.data));
      });
};


export const setRefData = data => ({
  type: SET_REF_DATA,
  refIngredients: data.refIngredients,
  refEquipments: data.refEquipments
});

export const setError = error => ({
  type: SET_ERROR,
  error
});

export const updateRecipes = recipes => ({
  type: UPDATE_RECIPES,
  recipes
});

export const updateRecipe = recipe => ({
  type: UPDATE_RECIPE,
  recipe
});

export const addRecipe = recipe => ({
  type: ADD_RECIPE,
  recipe
});
