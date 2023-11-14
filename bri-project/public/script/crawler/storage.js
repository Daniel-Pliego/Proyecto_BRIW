import { JSDOM } from 'jsdom';

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
        metaDescription: '',

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

    console.log(`Meta data from ${"here"}:`, result);
}

module.exports = {
    getURLsFromHTML: getURLsFromHTML,
    indexData: indexData
}