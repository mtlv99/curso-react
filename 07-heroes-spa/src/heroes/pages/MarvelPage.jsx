import React from 'react';
import { HeroList } from '../components';

export const MarvelPage = () => {
  console.log('');

  return (

    <>
      <h1>Marvel Comics</h1>
      <hr />

      <HeroList publisher="Marvel Comics" />
    </>
  );
};
