import axios from 'axios';

// constants
const initData = {
  fetching: false,
  array: [],
  current: {},
  favorites: []
}
const URL = 'https://rickandmortyapi.com/api/character';

const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR';

const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';

// reducer
const reducer = (state=initData, action) => {
  switch(action.type) {
    case GET_CHARACTERS:
      return { ...state, fetching: true }
    case GET_CHARACTERS_SUCCESS:
      return { ...state, array: action.payload, fetching: false }
    case GET_CHARACTERS_ERROR:
      return { ...state, fetching: false, error: action.payload }
    case REMOVE_CHARACTER:
      return { ...state, fetching: false, array: action.payload }
    case ADD_TO_FAVORITES:
      return { ...state, fetching: false,  ...action.payload }
    default:
      return state;
  }
}

// actions (thunks)
export const getCharactersAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTERS
  });

  return axios.get(URL)
    .then(res =>{
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: res.data.results
      });
    })
    .catch(error => {
      dispatch({
        type: GET_CHARACTERS_ERROR,
        payload: error.response.message
      });
      console.log(error);
    });
}

export const removeCharacterAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTERS
  });

  const { array } = getState().characters;
  array.shift();

  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...array]
  });
}

export const addToFavoritesAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTERS
  });

  const { array, favorites } = getState().characters;
  const char = array.shift();

  favorites.push(char);

  dispatch({
    type: ADD_TO_FAVORITES,
    payload: { array: [...array], favorites: [...favorites] }
  });
}

export default reducer;

