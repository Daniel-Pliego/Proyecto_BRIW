const {JSDOM} = require('jsdom');

function getURLsFromHTML(htmlBody, baseURL) {
    const urlsSet = new Set();
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');

    for (const linkElement of linkElements) {
        let href;
        if (linkElement.href.slice(0, 1) === '/') {
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                href = urlObj.href;
            } catch (e) {
                console.log("error mal url");
                continue; 
            }
        } else {
            try {
                const urlObj = new URL(linkElement.href);
                href = urlObj.href;
            } catch (e) {
                console.log("error del url");
                continue; // Saltamos a la siguiente iteración del bucle si hay un error con la URL
            }
        }
        if (!urlsSet.has(href)) {
            urlsSet.add(href);
        }
    }

    const urls = Array.from(urlsSet);
    return urls;
}

function indexData(htmlBody, baseURL){
    console.log("Indexado", baseURL);
}

module.exports = {
    getURLsFromHTML: getURLsFromHTML,
    indexData: indexData
}