// eslint-disable-next-line import/no-named-as-default
import calendarApi from '../../src/api/calendarApi';

describe('Pruebas en el calendarApi', () => {
  test('debe de tener la configuración por defecto', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test('debe de tener el x-token en el header de todas las peticiones ', async () => {
    const token = '123-ABC-DEF';
    localStorage.setItem('token', token);
    const res = await calendarApi.get('/auth');
    expect(res.config.headers['x-token']).toBe(token);
  });
});
