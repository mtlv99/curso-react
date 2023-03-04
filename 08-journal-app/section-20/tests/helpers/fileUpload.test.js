import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

// Esto JAMÁS debería de estar en un proyecto de frontend.
// Acá se pone por motivos educativos y porque en teoria,
// la parte de testing nunca será parte del build final de producción.
cloudinary.config(
  {
    cloud_name: 'mleon-cursos-react',
    api_key: '626152256886537',
    api_secret: 'tBz0glw05Eqxlnk4gDUbg-_OtkI',
  },
);

describe('Pruebas en fileUpload', () => {
  test('debe de subir el archivo a Cloudinary', async () => {
    const imageUrl = 'https://raw.githubusercontent.com/testing-library/react-testing-library/main/other/goat.png';

    const resp = await fetch(imageUrl);
    const blob = await resp.blob();

    const file = new File([blob], 'testing.png');

    const url = await fileUpload(file);
    console.log('Temp file uploaded? ', url);

    expect(typeof url).toBe('string');

    // console.log(url);
    const segments = url.split('/');
    // Obtiene el id de la imagen.
    const imageId = segments[segments.length - 1].replace('.png', '');
    const cloudResp = await cloudinary.api.delete_resources([`journal-app/${imageId}`], {
      resource_type: 'image',
    });
    console.log({ cloudResp });
  });

  test('debe de retornar null', async () => {
    const file = new File([], 'testing.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
