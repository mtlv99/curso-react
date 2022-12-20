import { useEffect } from 'react';
import getGifs from '../helpers/getGifs';


export default function GifGrid({ category }) {
  useEffect(() => {
    getGifs(category);
  }, []);


  return (
    <h1>
      {category}
    </h1>
  );
}
