import React from 'react';

import { connect } from 'react-redux';
import styles from './favs.module.css';
import Card from '../card/Card';

const FavPage = ({ characters = [0] }) => {
  const renderCharacter = (char, i) => (
    <Card {...char} key={i} hide />
  );

  return (
    <div className={styles.container}>
      <h2>Favoritos</h2>
      {characters.map(renderCharacter)}
      {!characters.length && <h3>No hay personajes agregados</h3>}
    </div>
  );
}

const mapStateToProps = ({characters: {favorites}}) => ({
  characters: favorites
});

export default connect(mapStateToProps)(FavPage);

