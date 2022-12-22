import { render, screen } from '@testing-library/react';
import { GifGrid } from '../../src/components/GifGrid';
import useFetchGifs from '../../src/hooks/useFetchGifs';

// Hará un mock de todo este import, pero la definición del mock se hará mas adelante
jest.mock('../../src/hooks/useFetchGifs');

describe('Pruebas en <GifGrid />', () => {
  const category = 'Cat';

  test('Debe de mostrar el loading inicialmente', () => {
    useFetchGifs.mockReturnValue({
      images: [],
      isLoading: true,
    });

    render(<GifGrid category={category} />);
    expect(screen.getByText('Cargando...'));
    expect(screen.getByText(category));
  });

  test('Debe de mostrar items cuando se cargan las imagenes del useFetch', () => {
    // Esto deberia de venir de en un directorio aparte, usualmente fixtures/mocks.
    const gifs = [
      {
        id: 'ABC',
        title: 'Meow',
        url: 'https://url.to.cat/1.jpg',
      },
      {
        id: 'CBA',
        title: 'Cat',
        url: 'https://url.to.cat/2.jpg',
      },
    ];

    useFetchGifs.mockReturnValue({
      images: gifs,
      isLoading: false,
    });

    render(<GifGrid category={category} />);

    // Como son varios cards, se utiliza getAllByRole en vez del getByRole normal
    expect(screen.getAllByRole('img').length).toBe(2);
  });
});
