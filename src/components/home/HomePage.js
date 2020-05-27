import React from 'react';
import { connect } from 'react-redux';

import { removeCharacterAction, addToFavoritesAction } from '../../redux/ducks';

import Card from '../card/Card';
import styles from './home.module.css';

function Home({ chars, removeCharacterAction, addToFavoritesAction }) {
    const nextCharacter = () => removeCharacterAction();
    const addFavorites = () => addToFavoritesAction();

    const renderCharacter = () => {
      let char = chars[0]
      return (
        <Card
          leftClick={nextCharacter}
          rightClick={addFavorites}
          {...char}
        />
      );
    };

    return (
      <div className={styles.container}>
        <h2>Personajes de Rick y Morty</h2>
        <div>
          { renderCharacter() }
        </div>
      </div>
    );
}

const mapStateToProps = state => {
  return {
    chars: state.characters.array
  }
};

export default connect(mapStateToProps, { removeCharacterAction, addToFavoritesAction })(Home);

