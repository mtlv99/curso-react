import { render, screen } from '@testing-library/react';
import GifExpertApp from '../src/GifExpertApp';

// TODO: hacer mas pruebas
describe('Pruebas en <GifExpertApp />', () => {
  test('Debe de hacer match con el snapshot', () => {
    const { container } = render(<GifExpertApp />);
    expect(container).toMatchSnapshot();
    // screen.debug();
  });
});
