import { loginWithGoogle } from '../../firebase.js';

// constants
const initData = {
  loggedIn: false,
  fetching: false
}

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

// reducers
const reducer = (state = initData, action) => {
  switch(action.type) {
    case LOGIN:
      return { ...state, fetching: true }
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, loggedIn: true, ...action.payload }
    case LOGIN_ERROR:
      return { ...state, fetching: false, error: action.payload }
    default:
      return state;
  }
}

// aux

const saveStorage = storage => {
  localStorage.storage = JSON.stringify(storage);
}

// action (action creator)

export const restoreSessionAction = () => dispatch => {
  let storage = localStorage.getItem('storage');
  storage = JSON.parse(storage);

  if (storage && storage.user) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage.user
    });
  }
}

export const doGoogleLoginAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN
  });

  return loginWithGoogle()
    .then(user => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }
      });
      saveStorage(getState());
    }).catch(error => {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.message
      });
      console.log(error);
    });
}

export default reducer;

