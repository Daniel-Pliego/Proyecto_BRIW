async function getUrlsFromFile() {
  try {
    const response = await fetch('http://localhost:3000/api/indexer/read', {
      method: 'GET'});
    const data = await response.json();
    return data; // Datos leídos desde el archivo JSON
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}

module.exports = {
  getUrlsFromFile: getUrlsFromFile
};