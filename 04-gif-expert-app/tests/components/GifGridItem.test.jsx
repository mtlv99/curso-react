import { render } from '@testing-library/react';
import { GifGridItem } from '../../src/components';


describe('Pruebas en <GifGridItem/>', () => {
  const title = 'Cat';
  const url = 'https://placekitten.com/400/300';

  test('Debe de hacer match con el snapshot', () => {
    const { container } = render(<GifGridItem title={title} url={url} />);
    expect(container).toMatchSnapshot();
  });
});
