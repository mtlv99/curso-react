import React from 'react';
import { HeroList } from '../components';

// eslint-disable-next-line arrow-body-style
export const MarvelPage = () => {
  return (

    <>
      <h1>Marvel Comics</h1>
      <hr />

      <HeroList publisher="Marvel Comics" />
    </>
  );
};
