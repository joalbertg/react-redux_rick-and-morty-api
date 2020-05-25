import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { userReducer, charsReducer, getCharactersAction } from './ducks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  user: userReducer,
  characters: charsReducer
});

const generateStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  // consiguiendo los personajes por primera vez.
  getCharactersAction()(store.dispatch, store.getState);
  return store;
}

export default generateStore;

