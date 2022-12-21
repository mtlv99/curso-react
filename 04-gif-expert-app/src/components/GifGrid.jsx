
import useFetchGifs from '../hooks/useFetchGifs';
import { GifGridItem } from './GifGridItem';

export const GifGrid = ({ category }) => {
  const { images, isLoading } = useFetchGifs(category);

  return (
    <>
      <h3>{category}</h3>

      {isLoading && (<h2>Cargando...</h2>)}

      <div className="card-grid">
        {/* También se puede hacer prop spreading, aunque el linter dice que es mala practica... */}
        {/* {images.map((image) => <GifGridItem key={image.id} {...image} />)} */}
        {images.map(({ title, url, id }) => <GifGridItem key={id} title={title} url={url} id={id} />)}
      </div>

    </>
  );
};
