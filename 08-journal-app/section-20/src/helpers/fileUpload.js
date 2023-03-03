// Permite subir archivos a Cloudinary.
// Solo soporta un archivo por llamado.
export const fileUpload = async (file) => {
  if (!file) throw new Error('Archivo no disponible.');

  const cloudUrl = 'https://api.cloudinary.com/v1_1/mleon-cursos-react/upload';

  // FormData permite construir un objeto de key/values para el body de un request.
  const formData = new FormData();

  // Elementos del body
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      // se pasa el formData al body
      body: formData,
    });

    if (!resp.ok) throw new Error('No se pudo subir imagen');

    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
