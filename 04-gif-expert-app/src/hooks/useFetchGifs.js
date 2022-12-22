import { useState, useEffect } from 'react';
import { getGifs } from '../helpers/getGifs';

export default function useFetchGifs(category) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getImages = async () => {
    const newImages = await getGifs(category);

    // A partir de React 18, acá no se hacen 2 renders (nice!!!)
    setImages(newImages);
    setIsLoading(false);
  };

  useEffect(() => {
    getImages();
  }, []);

  return { images, isLoading };
}
