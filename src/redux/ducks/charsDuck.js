// eslint-disable-next-line
//import axios from 'axios';
import ApolloClient, { gql } from 'apollo-boost';

import { updateDB, getFavorites } from '../../firebase';
import { saveStorage } from '../../helpers';

// constants
const initData = {
  fetching: false,
  array: [],
  current: {},
  favorites: []
}
// eslint-disable-next-line
//const URL = 'https://rickandmortyapi.com/api/character';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql'
});

const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR';

const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';

const GET_FAVORITES = 'GET_FAVORITES';
const GET_FAVORITES_SUCCESS = 'GET_FAVORITES_SUCCESS';
const GET_FAVORITES_ERROR = 'GET_FAVORITES_ERROR';

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
    case GET_FAVORITES:
      return { ...state, fetching: true }
    case GET_FAVORITES_SUCCESS:
      return { ...state, fetching: false, favorites: action.payload }
    case GET_FAVORITES_ERROR:
      return { ...state, fetching: false, error: action.payload }
    default:
      return state;
  }
}

// actions (thunks)
/*export const getCharactersAction = () => (dispatch, getState) => {*/
  //dispatch({
    //type: GET_CHARACTERS
  //});

  //return axios.get(URL)
    //.then(res =>{
      //dispatch({
        //type: GET_CHARACTERS_SUCCESS,
        //payload: res.data.results
      //});
    //})
    //.catch(error => {
      //dispatch({
        //type: GET_CHARACTERS_ERROR,
        //payload: error.response.message
      //});
      //console.log(error);
    //});
/*}*/

export const getCharactersAction = () => (dispatch, getState) => {
  const query = gql`
    {
      characters {
        results {
          name
          image
        }
      }
    }
  `;

  dispatch({
    type: GET_CHARACTERS
  });

  return client.query({
    query
  })
  .then(({ data, error }) => {
    if (error) {
      dispatch({
        type: GET_CHARACTERS_ERROR,
        payload: error.response.message
      });
      return
    }

    dispatch({
      type: GET_CHARACTERS_SUCCESS,
      payload: data.characters.results
    });
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
  updateDB(favorites, getState().user.uid);

  dispatch({
    type: ADD_TO_FAVORITES,
    payload: { array: [...array], favorites: [...favorites] }
  });

  saveStorage(getState());
}

export const retrieveFavorites = () => (dispatch, getState) => {
  dispatch({
    type: GET_FAVORITES
  });

  const { uid } = getState().user;
  return getFavorites(uid)
           .then(array => {
             dispatch({
               type: GET_FAVORITES_SUCCESS,
               payload: [...array]
             });
             saveStorage(getState());
           })
           .catch(error => {
             dispatch({
               type: GET_FAVORITES_ERROR,
               payload: error.message
             });
             console.log(error);
           });
}

export const restoreFavoritesAction = () => dispatch => {
  let storage = localStorage.getItem('storage');
  storage = JSON.parse(storage);

  if (storage && storage.characters) {
    dispatch({
      type: GET_FAVORITES_SUCCESS,
      payload: [...storage.characters.favorites]
    });
  }
}

export default reducer;

