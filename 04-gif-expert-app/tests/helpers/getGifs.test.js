import { getGifs } from '../../src/helpers/getGifs';

describe('Pruebas en getGifs()', () => {
  // Test asincrono, no olvidar el async
  test('Debe de retornar un arreglo de gifs', async () => {
    const gifs = await getGifs('Cat');
    expect(gifs.length).toBeGreaterThan(0);
    expect(gifs[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      // Buscar si es posible si se puede evaluar por URL valida,
      // ya que aquí estaria aceptando cualquier String
      url: expect.any(String),
    });
  });
});
