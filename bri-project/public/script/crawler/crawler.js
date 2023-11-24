import { getUrlsFromFile } from './scheduler';
import { getHTMLfromURL } from './downloader';
import { getURLsFromHTML, indexData } from './storage';

async function crawlPage(url, depth, visitedURLs) {
  if (depth === 0 || visitedURLs.has(url)) {
      return; 
  }

  try {
      var HTMLfromURL = await getHTMLfromURL(url);
      await indexData(HTMLfromURL, url);

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
  var urls = await getUrlsFromFile();
  let depthLevel = 2;
  let visitedURLs = new Set(); // Conjunto para almacenar URLs visitadas

  for (let i = 0; i < urls.length; i++) {
      let pagesIndex = urls[i].visited;
      let pageURL = urls[i].url;

      if (!pagesIndex) {
          await crawlPage(pageURL, depthLevel, visitedURLs);
          urls[i].visited = true;
      }
  }
  let aux = await updateURLsFromJSONFile(urls);
}

async function updateURLsFromJSONFile(dataToUpload) {
    const response = await fetch('http://localhost:3000/api/indexer/updateFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToUpload)
      });
      const data = await response.json();
      console.log(data);
}
export { initCrawler };
