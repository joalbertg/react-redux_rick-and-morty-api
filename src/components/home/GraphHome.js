// eslint-disable-next-line
import React, { useEffect, useState } from  'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

import Card from '../card/Card';

const GraphHome = () => {
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

  // eslint-disable-next-line
  const { data, loading, error } = useQuery(query);
  if (loading) return <h2>Loading...</h2>;
  return (
    <Card
      //leftClick={nextCharacter}
      //rightClick={addFavorites}
      {...data.characters.results[0]}
    />
  );
}

export default GraphHome;

