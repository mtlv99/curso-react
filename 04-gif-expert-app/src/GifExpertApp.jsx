import React, { useState } from 'react';

// Los archivos de index/indice o de barril son utiles para este tipo de importaciones,
// 2 componentes en un mismo import
import { AddCategory, GifGrid } from './components';

const GifExpertApp = () => {
  const [category, setCategory] = useState([]);

  const onAddCategory = (newCategory) => {
    // Valida que no exista una categoria con el mismo nombre, para evitar el error de las keys en los map.
    // No es mejor usar un uuid?
    if (category.includes(newCategory)) return;

    // Nota:
    // (A partir de React 18, si hay varios setState seguidos, React esperará a que ésta funcion principal
    // terminar para hacer el re-renderizado. En versiones anteriores, se hace un rerender por cada setState )

    setCategory([newCategory, ...category]);
    // setCategory((categories) => [newCategory, ...categories]);
    // Los llamados de arriba son equivalentes.
    // Aunque en componentes hijos, NO es necesario pasar el state de 'category' por props! Solo usar el callback de setCategory.
  };

  return (
    <>
      <h1>Buscador de GIF&apos;s</h1>

      <AddCategory
        // category={category}
        // setCategory={setCategory}
        // Recordar que cualquier funcion que tenga un 'on' al principio,
        // indica que emite un valor hacia afuera del componente (usualmente).
        onNewCategory={onAddCategory}
      />

      {category.map((categoryItem) => (
        <GifGrid
          key={categoryItem}
          category={categoryItem}
        />
      ))}
    </>


  );
};

export default GifExpertApp;
