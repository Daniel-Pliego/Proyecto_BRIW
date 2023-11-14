// Desc: Funciones para descargar el html de una url
async function getHTMLfromURL(currentURL) {
    const baseURL = new URL(currentURL);
    let htmlBody = "";
    try {
      const resp = await fetch(currentURL);
  
      if (!resp.ok) {
        console.log("Error en la solicitud:", resp.status);
        return htmlBody;
      }
  
      const contentType = resp.headers.get('content-type');
      if (contentType && !contentType.includes("text/html")) {
        console.log("Error en el tipo de contenido:", contentType);
        return htmlBody;
      }
  
      htmlBody = await resp.text();
    } catch (e) {
      console.error("Error en getHTMLfromURL:", e);
      throw new Error("Error al obtener HTML de la URL");
    }
    return htmlBody;
  }

module.exports = {
    getHTMLfromURL: getHTMLfromURL
}