import { getUrlsFromFile } from './scheduler';
import { getHTMLfromURL } from './downloader';
import { getURLsFromHTML, indexData } from './storage';

async function crawlPage(url, depth, visitedURLs) {
  if (depth === 0 || visitedURLs.has(url)) {
      return; // Salir de la función si hemos alcanzado el nivel de profundidad deseado o si ya hemos visitado esta URL
  }

  try {
      var HTMLfromURL = await getHTMLfromURL(url);
      indexData(HTMLfromURL, url);

      let newURLsToVisit = getURLsFromHTML(HTMLfromURL, url);
      visitedURLs.add(url); // Agregar la URL actual al conjunto de URLs visitadas

      for (let i = 0; i < newURLsToVisit.length; i++) {
          await crawlPage(newURLsToVisit[i], depth - 1, visitedURLs);
      }
  } catch (error) {
      console.error('Error al obtener HTML de la URL:', error.message);
  }
}

async function initCrawler() {
  var urls = getUrlsFromFile();
  let depthLevel = 2;
  let visitedURLs = new Set(); // Conjunto para almacenar URLs visitadas

  for (let i = 0; i < urls.length-1; i++) {
      let pages = urls[i].split('0');
      let pagesIndex = pages[1];
      let pageURL = pages[0];

      if (!pagesIndex) {
          await crawlPage(pageURL, depthLevel, visitedURLs);
      }
  }
}
export { initCrawler };
