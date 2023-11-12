const {JSDOM} = require('jsdom');

async function crawlPage(baseURL, currentURL, pages){
    const baseUR = new URL(baseURL);
    const currentUR = new URL(currentURL);
    if(baseUR.hostname !== currentUR.hostname){
        return pages;
    }

    const normalizeCurrentURL = normalizeURL(currentURL);
    if(pages[normalizeCurrentURL]>0){
        pages[normalizeCurrentURL]++;
        return pages;
    }

    pages[normalizeCurrentURL] = 1;
    console.log(`crawling ${currentURL}`);
    try{
        const resp = await fetch(currentURL);
        if(resp.status > 399){
            console.log("error 399");
            return pages;
        }
        const contentType = resp.headers.get('content-type');
        if(!contentType.includes("text/html")){
            console.log("error content-type");
            return pages;
        }
        const htmlBody = await resp.text();

        nextURLS = getURLsFromHTML(htmlBody, baseURL);
        for (const nextURL of nextURLS) {
            pages = await crawlPage(baseURL, nextURL, pages);
        }
    }catch(e){
        console.log("error murio");
    }
    return pages;
}
 
function getURLsFromHTML(htmlBody, baseURL){
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const linkElement of linkElements) {
        if(linkElement.href.slice(0,1) === '/'){
            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href);
            }catch(e){
                console.log("error mal url");
            }
        }else{
            try{
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            }catch(e){
                console.log("error mal url");
            }
        }
    }
    return urls;
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString);
    const hostPath =  `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPath.length>0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = {
    normalizeURL: normalizeURL,
    getURLsFromHTML: getURLsFromHTML,
    crawlPage: crawlPage
}