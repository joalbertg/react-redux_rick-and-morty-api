import React, { useEffect, useState } from  'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

import Card from '../card/Card';

const GraphHome = () => {
  let [chars, setChars] = useState([]);
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

  const { data, loading, error } = useQuery(query);

  useEffect(() => {
    if (data && !loading && !error) {
      setChars([...data.characters.results]);
    }
  // eslint-disable-next-line
  }, [data]);

  const nextCharacter = () => {
    chars.shift();
    setChars([...chars]);
  }

  if (loading) return <h2>Loading...</h2>;
  return (
    <Card
      leftClick={nextCharacter}
      //rightClick={addFavorites}
      {...chars[0]}
    />
  );
}

export default GraphHome;

