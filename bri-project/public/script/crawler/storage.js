//https://lbdremy.github.io/solr-node-client/
//https://cwiki.apache.org/confluence/display/solr/MoreLikeThisHandler
import { JSDOM } from 'jsdom';
var solr = require('solr-client')

const solrClient = solr.createClient({
    host: 'localhost',
    port: 8983,
    core: 'MiN',
    path: '/solr',
});

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
                console.log("error del url storage");
                continue; 
            }
        } else {
            try {
                const urlObj = new URL(linkElement.href);
                href = urlObj.href;
            } catch (e) {
                console.log("error del url storage");
                continue; 
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
    const metaTags = getMetaTagsFromHTML(htmlBody);
    const titleTag = getTitleTagFromHTML(htmlBody);
    handleMetaTags(metaTags, titleTag);
}

function getMetaTagsFromHTML(html) {
    const dom = new JSDOM(html);
    return dom.window.document.querySelectorAll('meta');
}

function getTitleTagFromHTML(html) {
    const dom = new JSDOM(html);
    return dom.window.document.querySelector('title');
}

function handleMetaTags(metaTags, titleTag, url) {
    const result = {
        title: titleTag ? titleTag.text : '',
        metaTitle: '',
        metaType: '',
        meDescription: '',

    };

    metaTags.forEach((tag) => {
        const tagName = tag.getAttribute('name');
        const tagProperty = tag.getAttribute('property');
        const tagContent = tag.getAttribute('content');

        if (tagName === 'title') {
            result.title = tag.textContent;
        } else if (tagProperty === 'og:title') {
            result.metaTitle = tagContent;
        } else if (tagProperty === 'og:type') {
            result.metaType = tagContent;
        } else if (tagName === 'description' || tagProperty === 'og:description') {
            result.metaDescription = tagContent;
        }
    });
    sendDataToSolrClient(JSON.parse(JSON.stringify(result)));
}

function sendDataToSolrClient(data) {
    console.log("data", data);
    solrClient.add(data, function(err, obj) {
        if (err) {
            console.error('Error al indexar el documento en Solr:', err);
        } else {
            // Confirma los cambios
            solrClient.commit(function(err, res) {
                if (err) {
                    console.error('Error al confirmar el cambio en Solr:', err);
                } else {
                    console.log('Documento indexado con éxito en Solr:', res);
                }
            });
        }
    });
}

module.exports = {
    getURLsFromHTML: getURLsFromHTML,
    indexData: indexData
}