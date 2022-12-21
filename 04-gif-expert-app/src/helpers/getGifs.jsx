export default async function getGifs(category) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=bopySAL5uwOsyZUf5Fc9UObeY4uVe4fr&q=${category}&limit=20`;

  const resp = await fetch(url);
  // para que tenga un valor por defecto
  const { data = [] } = await resp.json();

  const gifs = data.map((img) => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url,
  }));

  return gifs;
}
