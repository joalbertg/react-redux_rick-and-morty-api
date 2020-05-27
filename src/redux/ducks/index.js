export {
  default as charsReducer,
  getCharactersAction,
  removeCharacterAction,
  addToFavoritesAction,
  retrieveFavorites,
  restoreFavoritesAction
} from './charsDuck';

export {
  default as userReducer,
  doGoogleLoginAction,
  restoreSessionAction,
  logOutAction
} from './userDuck';

