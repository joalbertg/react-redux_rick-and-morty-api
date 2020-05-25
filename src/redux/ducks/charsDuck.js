import axios from 'axios';

// constants
const initData = {
  fetching: false,
  array: [],
  current: {}
}
const URL = 'https://rickandmortyapi.com/api/character';

const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR';

// reducer
const reducer = (state=initData, action) => {
  switch(action.type) {
    case GET_CHARACTERS:
      return { ...state, fetching: true }
    case GET_CHARACTERS_SUCCESS:
      return { ...state, array: action.payload, fetching: false }
    case GET_CHARACTERS_ERROR:
      return { ...state, fetching: false, error: action.payload }
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

export default reducer;

