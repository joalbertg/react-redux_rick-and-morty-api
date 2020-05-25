// constants
const initData = {
  loggedIn: false
}

const LOGIN = 'LOGIN';

// reducers
export default const reducer = (state = initData, action) => {
  switch(action.type) {
    case LOGIN:
    default:
      return state;
  }
}

// action (action creator)

