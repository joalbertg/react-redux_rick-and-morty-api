// constants
const initData = {
  loggedIn: false
}

const LOGIN = 'LOGIN';

// reducers
const reducer = (state = initData, action) => {
  switch(action.type) {
    case LOGIN:
    default:
      return state;
  }
}

export default reducer;

// action (action creator)

