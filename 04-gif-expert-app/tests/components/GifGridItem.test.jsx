import { render, screen } from '@testing-library/react';
import { GifGridItem } from '../../src/components';


describe('Pruebas en <GifGridItem/>', () => {
  const title = 'Cat';
  const url = 'https://placekitten.com/400/300';

  test('Debe de hacer match con el snapshot', () => {
    const { container } = render(<GifGridItem title={title} url={url} />);
    expect(container).toMatchSnapshot();
  });

  test('Debe de mostrar la imagen con el URL y el alt indicado', () => {
    render(<GifGridItem title={title} url={url} />);
    // Para mostrar todo el HTML renderizado
    // screen.debug();
    // Esta es una manera, pero puede llegar a ser muy larga
    // expect(screen.getByRole('img').src).toBe(url);
    // Es mejor hacer destructuring de las propiedades necesarias y luego evaluarlas
    const { src, alt } = screen.getByRole('img');
    expect(src).toBe(url);
    expect(alt).toBe(title);
  });

  test('Debe de mostrar el titulo en el componente', () => {
    render(<GifGridItem title={title} url={url} />);

    // Este mismo title también esta siendo usado como atributo alt en la img, pero
    // el getByText no considera atributos como texto, por eso no lo encuentra.
    // Hacer la prueba comentando el <p>{title}</p> del GifGridItem.jsx
    expect(screen.getByText(title)).toBeTruthy();
  });
});
